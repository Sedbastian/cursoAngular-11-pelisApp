import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CarteleraResponse } from '../interfaces/cartelera-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  constructor(private http: HttpClient) {}

  getCartelera(): Observable<CarteleraResponse> {
    return this.http.get<CarteleraResponse>(
      'https://api.themoviedb.org/3/movie/now_playing',
      {
        headers: {
          accept: 'application/json',
          Authorization:
            'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZiYzlhMDA4ZDNkZjk4YTg0ZTc4MGVkZWMwZmU4YyIsInN1YiI6IjY0YjU0NzZmMzc4MDYyMDBlMmFjMjY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2uD0MEmiK3E54d8SOKn_osLbpxPvt5DGFHWgkFtOco',
        },
      }
    );
  }
}
