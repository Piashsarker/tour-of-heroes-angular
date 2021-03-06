import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { Hero } from '../hero';

import { HeroService } from '../hero.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HeroesComponent implements OnInit {


   heroes: Hero[] ;

   constructor(private heroService: HeroService) { }

   ngOnInit() {
     this.getHeroes();
   }


   // getHeroes(): void {
   //    this.heroes =  this.heroService.getHeroes();
   // }

    /** getHeroes method to get the observable heroes array **/

    getHeroes(): void{
        // Sending message after fetching the heroes


        this.heroService.getHeroes().subscribe(
            heroes=>this.heroes=heroes);
    }




}
