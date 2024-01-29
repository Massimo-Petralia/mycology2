import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  IconographicContainer,
  Iconography,
  Mushroom,
} from '../models/mycology.models';
import { Observable, catchError } from 'rxjs';

const mushroomsDataURL = 'http://localhost:3000/mushrooms';
const iconographiesDataURL = 'http://localhost:3000/iconographies';

export interface Response {
  items: number;
  data: Mushroom[];
}

@Injectable({
  providedIn: 'root',
})
export class MycologyService {
  constructor(private http: HttpClient) {}

  getMushrooms(pageIndex: number): Observable<Response> {
    return this.http
      .get<Response>(`${mushroomsDataURL}?_page=${pageIndex}`)
      .pipe(
        catchError((error) => {
          console.error('get request failed', error);
          throw error;
        })
      );
  }

  createMushroom(mushroom: Mushroom) {
    return this.http.post<Mushroom>(mushroomsDataURL, mushroom).pipe(
      catchError((error) => {
        console.error('post mushroom failed', error);
        throw error;
      })
    );
  }

  createIconography(iconographicContainer: IconographicContainer) {
    return this.http
      .post<IconographicContainer>(iconographiesDataURL, iconographicContainer)
      .pipe(
        catchError((error) => {
          console.error('post iconographicContainer failed');
          throw error;
        })
      );
  }

  getMushroom(id: string): Observable<Mushroom> {
    return this.http.get<Mushroom>(`${mushroomsDataURL}/${id}`).pipe(
      catchError((error) => {
        console.error('load mushroom failed', error);
        throw error;
      })
    );
  }

  getIconography(id: string): Observable<IconographicContainer> {
    return this.http
      .get<IconographicContainer>(`${iconographiesDataURL}/${id}`)
      .pipe(
        catchError((error) => {
          console.error('load iconographic container failed', error);
          throw error;
        })
      );
  }

  deleteMushroom(id: string) {
    return this.http.delete(`${mushroomsDataURL}/${id}`).pipe(
      catchError((error) => {
        console.error('delete mushroom failed');
        throw error;
      })
    );
  }

  deleteIconography(id: string) {
    return this.http.delete(`${iconographiesDataURL}/${id}`).pipe(
      catchError((error) => {
        console.error('delete iconography failed');
        throw error;
      })
    );
  }

  updateMushroom(mushroom: Mushroom): Observable<Mushroom> {
    return this.http
      .put<Mushroom>(`${mushroomsDataURL}/${mushroom.id}`, mushroom)
      .pipe(
        catchError((error) => {
          console.error('update mushroom failed');
          throw error;
        })
      );
  }

  updateIconography(
    iconographicContainer: IconographicContainer
  ): Observable<IconographicContainer> {
    return this.http
      .put<IconographicContainer>(
        `${iconographiesDataURL}/${iconographicContainer.id}`,
        iconographicContainer
      )
      .pipe(
        catchError((error) => {
          console.error('update iconography failed');
          throw error;
        })
      );
  }

updateMushroomProperties(id: string, propertiesToChange: Partial<Mushroom>) {
  return this.http.patch(`${mushroomsDataURL}/${id}`, propertiesToChange).pipe(
    catchError(error => {
      console.error('update properties failed')
      throw error
    })
  )
}

}
