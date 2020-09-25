import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of, concat} from 'rxjs';
import {map} from 'rxjs/operators';

import {AutoCompleteService} from 'ionic4-auto-complete';
import { CountryModel } from '../models/country.model';


@Injectable()
export class CountryService implements AutoCompleteService {
  labelAttribute = 'name';

  private countries:CountryModel[] = [];
  constructor(
    private http:HttpClient
  ) {

  }

  getResults(keyword?:string):Observable<any[]> {
    keyword = typeof keyword === 'string' ? keyword : '';

    let observable:Observable<any>;

    if (this.countries.length === 0) {
      observable = this.http.get('https://restcountries.eu/rest/v2/all').pipe(
        map(
          (results:CountryModel[]) => {
            if (results) {
              this.countries = results;
            }

            return this.countries;
          }
        )
      );
    } else {
      observable = of(this.countries);
    }

    return observable.pipe(map((res)=>{
      let name = [];
        let nativ = [];
      res.forEach(element => {
        name.push(element.languages[0].name);
        nativ.push(element.languages[0].nativeName);
        
      });
     
      let languages = nativ;
      const all = new Set(languages);
      let array = Array.from(all);
      console.log(all);
       return array.filter(
            (item) => {
              return item.toLowerCase().startsWith(
                  keyword.toLowerCase()
              );
            }
          );
    })
    );
  }

  

  filterByValue(array, string) {
    return array.filter(o => {
      return Object.keys(o).some(k => {
        if (typeof o[k] === 'string') {
          return this.slugify(o[k]).includes(string.toLowerCase())
        };
      });
    });
  }

  slugify(str) {
    var map = {
      'a': 'á|à|ã|â|À|Á|Ã|Â',
      'e': 'é|è|ê|É|È|Ê',
      'i': 'í|ì|î|Í|Ì|Î',
      'o': 'ó|ò|ô|õ|Ó|Ò|Ô|Õ',
      'u': 'ú|ù|û|ü|Ú|Ù|Û|Ü',
      'c': 'ç|Ç',
      'n': 'ñ|Ñ'
    };

    str = str.toLowerCase();

    for (var pattern in map) {
      str = str.replace(new RegExp(map[pattern], 'g'), pattern);
    };

    return str;
  };
}
