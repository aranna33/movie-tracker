import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Movie {
  id?: number;
  title: string;
  director: string;
}
const apiUrl = (window as any)['env']?.apiUrl || 'http://localhost:8000';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private baseUrl = apiUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movie);
  }
}
