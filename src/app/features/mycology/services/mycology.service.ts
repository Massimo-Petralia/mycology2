import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Mushroom } from '../models/mycology.models';
import { Observable, catchError } from 'rxjs';

const mushroomsDataURL = 'http://localhost:3000/mushrooms';
const iconographiesDataURL = 'http://localhost:3000/iconographies'

export interface Response {
  pages: number;
  items: number;
  data: Mushroom[]
}

@Injectable({
  providedIn: 'root'
})
export class MycologyService {

  constructor(private http: HttpClient) { }

  
getMushrooms(pageIndex: number): Observable<Response>{
  return this.http.get<Response>(`${mushroomsDataURL}?_page=${pageIndex}`).pipe(
    catchError((error)=> {
      console.error('get request failed', error)
      throw error
    })
  )
}

}
