import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
// import { STARS } from '../mock-heroes';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  // stars = STARS;
  stars: Hero[];

  // selectedStar: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getStars();
  }

  // onSelect(star: Hero): void {
  //   this.selectedStar = star;
  // }

  // getStars(): void {
  //   this.stars = this.heroService.getStars();
  // }
  getStars(): void{
    this.heroService.getStars().subscribe(stars => this.stars = stars);
  }

  add(name: string): void{
    name = name.trim();
    if(!name){return;}
    this.heroService.addStar({name} as Hero)
    .subscribe(star=>{
      this.stars.push(star);
    })
  }

  delete(star: Hero): void{
    this.stars = this.stars.filter(h=>h!==star);
    this.heroService.deleteStar(star).subscribe();
  }

}
