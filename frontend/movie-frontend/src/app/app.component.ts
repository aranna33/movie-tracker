import { Component, OnInit } from '@angular/core';
import { Movie, MovieService } from './movie.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  movies: Movie[] = [];
  newMovie: Movie = { title: '', director: '' };
  loading = false;
  error = '';

  constructor(private movieService: MovieService) {}

  ngOnInit() {
    this.fetchMovies();
  }

  fetchMovies() {
    this.loading = true;
    this.movieService.getMovies().subscribe({
      next: (movies) => {
        this.movies = movies;
        this.loading = false;
      },
      error: () => {
        this.error = 'Failed to load movies.';
        this.loading = false;
      },
    });
  }

  addMovie() {
    if (!this.newMovie.title || !this.newMovie.director) {
      this.error = 'Please enter both title and director.';
      return;
    }
    this.loading = true;
    this.movieService.addMovie(this.newMovie).subscribe({
      next: (movie) => {
        this.movies.push(movie);
        this.newMovie = { title: '', director: '' };
        this.loading = false;
        this.error = '';
      },
      error: () => {
        this.error = 'Failed to add movie.';
        this.loading = false;
      },
    });
  }
}
