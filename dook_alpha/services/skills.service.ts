import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable, of, concat} from 'rxjs';
import {map} from 'rxjs/operators';

import {AutoCompleteService} from 'ionic4-auto-complete';
import { FirestoreService } from '../firestore.service';



@Injectable({
  providedIn: 'root'
})
export class SkillsService implements AutoCompleteService{
  labelAttribute = 'name';

  private skills:any = [];
  constructor(
    private http:HttpClient
  ) {

  }

  getResults(keyword?:string):Observable<any[]> {
    keyword = typeof keyword === 'string' ? keyword : '';

    let observable:Observable<any>;

    if (this.skills.length === 0) {
     
    }

    return observable.pipe(map((res)=>{
       return res.filter(
            (item) => {
              return item.toLowerCase().startsWith(
                  keyword.toLowerCase()
              );
            }
          );
    })
    );
  }

  
}
