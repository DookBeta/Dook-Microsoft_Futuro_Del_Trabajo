
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';



@Injectable()
export class newEducationService {
  labelAttribute = 'name';

education = []

  constructor(
    private http:HttpClient
  ) {

  }

}