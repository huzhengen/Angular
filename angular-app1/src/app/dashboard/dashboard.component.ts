import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  stars: Hero[] = [];

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getStars();
  }

  getStars(): void{
    this.heroService.getStars().subscribe(stars => this.stars = stars.slice(1, 5));
  }

}
