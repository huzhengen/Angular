import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService} from '../hero.service';
import { Hero } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {

  @Input() star: Hero;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) { }

  ngOnInit() {
    this.getStar();
  }

  getStar(): void{
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getStar(id).subscribe(star => this.star = star);
  }

  goBack(): void{
    this.location.back();
  }

  save(): void{
    this.heroService.updateStar(this.star)
    .subscribe(()=>this.goBack());
  }
}
