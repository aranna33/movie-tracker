import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

export interface Movie {
  id?: number;
  title: string;
  director: string;
}

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  // Make sure this points to your backend!
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.baseUrl}/movies`);
  }

  addMovie(movie: Movie): Observable<Movie> {
    return this.http.post<Movie>(`${this.baseUrl}/movies`, movie);
  }
}
