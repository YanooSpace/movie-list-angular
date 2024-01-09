import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Movie, MovieListService } from './services/movie-list.service';
import { Observable } from 'rxjs'
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  movieList$: Observable<Movie[]> = this.movieListService.getMovieList();
  selectedMovieId: number = -1;
  movie: Movie = {
    id: 0,
    title: '',
    director: '',
    releaseDate: '',
    actors: []
  }

  constructor(
    private readonly movieListService: MovieListService
  ) { }

  resetMovie() {
    this.movie = {
      id: 0,
      title: '',
      director: '',
      releaseDate: '',
      actors: []
    }
  }

  onCreate() {
    // id 제외한 나머지 :구조분해할당
    const { id, ...rest } = this.movie;
    this.movieListService.addMovieList(rest);

    // 필드초기화
    this.resetMovie();
  }

  editMovie(movie: Movie) {
    this.selectedMovieId = movie.id;
    this.movie = movie;
  }

  /**
   * this.movie 가 가르키는 movie 
   */
  updateMovie() {
    this.movieListService.updateMovie(this.selectedMovieId, this.movie)
    this.selectedMovieId = -1;
  }
}