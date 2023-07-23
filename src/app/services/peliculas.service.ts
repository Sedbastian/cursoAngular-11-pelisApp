import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { MovieResponse } from '../interfaces/movie-response';
import { Cast, CreditsResponse } from '../interfaces/credits-response';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl = 'https://api.themoviedb.org/3';
  private page = 1;
  public cargando = false;

  constructor(private http: HttpClient) {}

  get params() {
    return {
      api_key:
        'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZmZiYzlhMDA4ZDNkZjk4YTg0ZTc4MGVkZWMwZmU4YyIsInN1YiI6IjY0YjU0NzZmMzc4MDYyMDBlMmFjMjY3OCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Y2uD0MEmiK3E54d8SOKn_osLbpxPvt5DGFHWgkFtOco',
      page: this.page.toString(),
    };
  }

  resetCarteleraPage() {
    this.page = 1;
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }

    this.cargando = true;

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing`, {
        headers: {
          accept: 'application/json',
          Authorization: this.params.api_key,
        },
        params: {
          page: this.params.page,
        },
      })
      .pipe(
        map((resp) => {
          return resp.results;
        }),
        tap(() => {
          this.page += 1;
          this.cargando = false;
        })
      );
  }

  buscarPelicula(texto: string): Observable<Movie[]> {
    const params = { ...this.params, page: '1' };

    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie`, {
        headers: { accept: 'application/json', Authorization: params.api_key },
        params: { page: params.page, query: texto },
      })
      .pipe(map((resp) => resp.results));
  }

  getPeliculaDetalle(id: string) {
    return this.http
      .get<MovieResponse>(`${this.baseUrl}/movie/${id}`, {
        headers: {
          accept: 'application/json',
          Authorization: this.params.api_key,
        },
      })
      .pipe(catchError((err) => of(null)));
  }

  getCast(id: string): Observable<Cast[]> {
    return this.http
      .get<CreditsResponse>(`${this.baseUrl}/movie/${id}/credits`, {
        headers: {
          accept: 'application/json',
          Authorization: this.params.api_key,
        },
      })
      .pipe(
        map((resp) => resp.cast),
        catchError((err) => of([]))
      );
  }
}
