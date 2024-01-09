import { Injectable } from '@angular/core';
import {BehaviorSubject } from 'rxjs'
import { FormsModule } from '@angular/forms';

export interface Movie {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  actors: string[];
}

export type AddMovie = Omit<Movie, 'id'>;

export type UpadateMovie = Partial<Omit<Movie, 'id'>>;

@Injectable({
  providedIn: 'root'
})
export class MovieListService {

  /**
   * BehaviorSubject : 초기값 있음, 마지막 값을 저장 후 구독자에게 발행
   * objerver와 관련된 변수는 뒤에 $ 를 꼭 붙여준다
   */
   private movieList$ = new BehaviorSubject<Movie[]>([
    {
      id: 1,
      title: '서울의 봄',
      director: '김성수',
      releaseDate: '2023-11-22',
      actors: ['황정민', '정우성', '이성민']
    },
    {
      id: 2,
      title: '외계인 + 2',
      director: '최동훈',
      releaseDate: '2024-01-10.',
      actors: ['류준열', '김태리', '김우빈']
    },
    {
      id: 3,
      title: '위시',
      director: '크리스벅',
      releaseDate: '2024-01-03',
      actors: ['아리아나', '크리스', '알란']
    },
    {
      id: 4,
      title: '3일의 휴가',
      director: '육상효',
      releaseDate: '2023-12-06',
      actors: ['김해숙', '신민아', '강기영']
    },
  ])

  constructor() {}

  // movieList를 가져오는
  getMovieList() {
    return this.movieList$.asObservable();
  }

  // movieList 등록
  // 전개구문 배열 삽입 공식
  addMovieList(movie: AddMovie) {
    const newMovie = {
      ...movie,
      id: this.movieList$.value.length + 1
    }
    this.movieList$.next([
      ...this.movieList$.value,
      newMovie
    ])
  }

  updateMovies(){
    const updateMovie = {

    }
  }

}
