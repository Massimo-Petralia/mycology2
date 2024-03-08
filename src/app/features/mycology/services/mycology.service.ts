import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { IconographicContainer, Mushroom } from '../models/mycology.models';
import { Observable, catchError, of, map } from 'rxjs';

const mushroomsDataURL = 'http://localhost:3000/mushrooms';
const iconographiesDataURL = 'http://localhost:3000/iconographies';

export interface Response {
  items: string | null;
  data: Mushroom[] | null;
}

@Injectable({
  providedIn: 'root',
})
export class MycologyService {
  constructor(private http: HttpClient) {}

  getMushrooms(
    pageIndex: number,
    filter: string | null,
    search: string | null
  ) {
    return this.http
      .get<Mushroom[]>(
        `${mushroomsDataURL}?taxonomy.${filter}_like=${search}&_page=${pageIndex}&_limit=8`,
        {
          observe: 'response',
          transferCache: { includeHeaders: ['X-Total-Count'] },
        }
      )
      .pipe(
        map((response) => {
          return {
            items: Number(response.headers.get('X-Total-Count')),
            data: response.body!,
          };
        })
      );
  }

  createMushroom(mushroom: Mushroom) {
    return this.http.post<Mushroom>(mushroomsDataURL, mushroom);
  }

  createIconography(iconographicContainer: IconographicContainer) {
    return this.http.post<IconographicContainer>(
      iconographiesDataURL,
      iconographicContainer
    );
  }

  getMushroom(id: string): Observable<Mushroom> {
    return this.http.get<Mushroom>(`${mushroomsDataURL}/${id}`);
  }

  getIconography(id: string): Observable<IconographicContainer> {
    return this.http.get<IconographicContainer>(
      `${iconographiesDataURL}/${id}`
    );
  }

  deleteMushrooms(id: string) {
    return this.http.delete(`${mushroomsDataURL}/${id}`);
  }

  deleteIconographies(id: string) {
    return this.http.delete(`${iconographiesDataURL}/${id}`);
  }

  updateMushroom(mushroom: Mushroom): Observable<Mushroom> {
    return this.http.put<Mushroom>(
      `${mushroomsDataURL}/${mushroom.id}`,
      mushroom
    );
  }

  updateIconography(
    iconographicContainer: IconographicContainer
  ): Observable<IconographicContainer> {
    return this.http.put<IconographicContainer>(
      `${iconographiesDataURL}/${iconographicContainer.id}`,
      iconographicContainer
    );
  }

  updateMushroomProperties(id: string, propertiesToChange: Partial<Mushroom>) {
    return this.http.patch(`${mushroomsDataURL}/${id}`, propertiesToChange);
  }
}
