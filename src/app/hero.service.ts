import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { MessageService } from "./message.service";

@Injectable()
export class HeroService {

  constructor(private messageService: MessageService) {

  }

  /** default hero **/
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }


  /** Observeable hero example **/

  getHeroes(): Observable<Hero[]>{
    // TODO: sending a message after fetching the heroes\
    this.messageService.add('HeroService: fetched heroes');
    return of(HEROES);
  }

  getHero(id: number ):Observable<Hero>{
      this.messageService.add(`HeroService: fetched hero id=${id}`);
      return of(HEROES.find(hero=> hero.id===id));
  }


}
