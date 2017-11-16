import { Injectable } from '@angular/core';

import { Hero } from './hero';
import { HEROES } from './mock-heroes';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";

import { MessageService } from "./message.service";
import { HttpClient , HttpHeaders} from "@angular/common/http";

import { catchError , map ,tap } from "rxjs/operators";

@Injectable()
export class HeroService {

    private heroesUrl = 'api/heroes' ; //url to web api

     httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

  constructor(private messageService: MessageService ,
              private http: HttpClient) {

  }

  /** default hero **/
  // getHeroes(): Hero[] {
  //   return HEROES;
  // }


  /** Observeable hero example **/

  /** HttpClient.get()
   *  returns the body of the response as an untyped JSON object by default. **/

   getHeroes(): Observable<Hero[]>{
    // TODO: sending a message after fetching the heroes\

    this.messageService.add('HeroService: fetched heroes');
    return this.http.get<Hero[]>(this.heroesUrl)
        .pipe(
            tap(heroes=>this.log(`fetched heroes`)),
            catchError(this.handleError('getHeroes',[]))
        );

  }

    /** GET hero by id. Will 404 if id not found */
  getHero(id: number ):Observable<Hero>{
      this.log(`HeroService: fetched hero id=${id}`);

      const url = `${this.heroesUrl}/${id}`;

      return this.http.get<Hero>(url).pipe(
          tap(_=>this.log(`fetched hero id = ${id}`)),
              catchError(this.handleError<Hero>(`getHero id= ${id}`))
      );
  }

  private log(message: String ){
      this.messageService.add('HeroService: '+ message);
  }



    /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */

    private handleError<T>(operation='operation', result?:T){
        return (error: any ): Observable<T> => {
            // TODO: send the error to remote logging infrastructure

            console.error(error); // log to console instead

            // TODO: better job of transforming error for user consumption

            this.log(`${operation} failed: ${error.message}`);

            //let the app keep running by returning an empty result

            return of(result as T);
        };
    }

    /** PUT: update the hero on the server */

    updateHero(hero: Hero): Observable<any>{
        return this.http.put(this.heroesUrl,hero, this.httpOptions).pipe(
            tap(_=>this.log(`updated hero id =${hero.id}`)),
            catchError(this.handleError<any>('updateHero'))
        );
    }


    addHero(hero: Hero): Observable<Hero> {
        return this.http.post<Hero> (this.heroesUrl,hero,
            this.httpOptions).pipe(
          tap((hero: Hero)=> this.log(`Added hero : id=${hero.id} and 
          nam=${hero.name}`)),
          catchError(this.handleError<Hero>('addHero'))
        );
    }

    /** DELETE: delete the hero from the server */
    deleteHero(hero: Hero | number ): Observable<Hero> {
        const id = typeof hero==='number'? hero: hero.id;
        const url = `${this.heroesUrl}/${id}`;

        return this.http.delete<Hero> (url, this.httpOptions).pipe(
            tap(_=> this.log(`deleted hero id=${id}`)),
            catchError(this.handleError<Hero>('deleteHero'))
        );
    }



    /* TODO:  GET heroes whose name contains search term */
    searchHeroes(term: string): Observable<Hero[]>{
        if(!term.trim()){
            //if not search  term , return empty hero array.
            return of([]);
        }

        return this.http.get<Hero[]>(`api/heroes/?name=${term}`).pipe(

            tap(_=> this.log(`found heroes matching "${term}"`)),
            catchError(this.handleError<Hero[]>('Search Heroes',[]))
        );
    }
}
