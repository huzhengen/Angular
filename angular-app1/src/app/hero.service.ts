import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { Hero } from './Hero';
// import { STARS } from './mock-heroes';
import { MessageService } from './message.service';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class HeroService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) { }

  private log(message: string){
    this.messageService.add(`HeroService: ${message}`);
  }

  private starsUrl = 'api/stars';

  private handleError<T> (operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);

      this.log(`${operation} failed: ${error.message}`);

      return of(result as T);
    }
  }

  // getStars(): Hero[]{
  //   return STARS;
  // }
  // getStars(): Observable<Hero[]>{
  //   this.messageService.add('HeroService: fetched stars');
  //   return of(STARS);
  // }
  getStars(): Observable<Hero[]>{
    return this.http.get<Hero[]>(this.starsUrl)
    .pipe(tap(stars=>this.log('fetched stars')), catchError(this.handleError('getStars', [])));
  }

  // getStar(id: number): Observable<Hero>{
  //   this.messageService.add(`HeroService: fetched hero id=${id}`);
  //   return of(STARS.find(star=>star.id===id));
  // }
  getStar(id: number): Observable<Hero>{
    const url = `${this.starsUrl}/${id}`;
    return this.http.get<Hero>(url)
    .pipe(tap(_=>this.log(`fetched hero id=${id}`)), catchError(this.handleError<Hero>(`getStar id=${id}`)))
  }

  updateStar(star: Hero): Observable<any>{
    return this.http.put(this.starsUrl, star, httpOptions)
    .pipe(tap(_=>this.log(`updated star id=${star.id}`)), catchError(this.handleError<any>('updateStar')))
  }

  addStar (star: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.starsUrl, star, httpOptions).pipe(
      tap((hero: Hero) => this.log(`added hero w/ id=${hero.id}`)),
      catchError(this.handleError<Hero>('addHero'))
    );
  }
  
  deleteStar(star: Hero | number): Observable<Hero>{
    const id = typeof star === 'number' ? star : star.id;
    const url = `${this.starsUrl}/${id}`;

    return this.http.delete<Hero>(url, httpOptions)
    .pipe(tap(_=>this.log(`delete star id=${id}`)), catchError(this.handleError<Hero>('deleteStar')));
  }

  searchStars(term: string): Observable<Hero[]>{
    if(!term.trim()){
      return of([]);
    }
    return this.http.get<Hero[]>(`${this.starsUrl}/?name=${term}`)
    .pipe(tap(_=>this.log(`found stars matching "${term}"`)), catchError(this.handleError<Hero[]>('searchStars', [])));
  }
}
