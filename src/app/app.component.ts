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

  /**
   * @param movie 선택된 movie배열 
   * slectedMovieId : 선택된 movie의 id값을 넣은 변수
   */
  editMovie(movie: Movie) {
    this.selectedMovieId = movie.id;
    this.movie = movie;
    console.log(movie)
    console.log(this.selectedMovieId)
  }

  /**
   * this.movie : input창에서 받아온 수정할 데이터를 임시로 저장한 변수
   */
  updateMovie() {
    this.movieListService.updateMovie(this.selectedMovieId, this.movie)
    this.selectedMovieId = -1;
    this.resetMovie()
  }
}