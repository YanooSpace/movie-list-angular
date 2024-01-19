import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

export interface Movie {
  id: number;
  title: string;
  director: string;
  releaseDate: string;
  actors: string[];
}
/**
 * Omit<객체, 제외할 속성키>
 * 특정 타입에서 지정된 속성만 제거한 타입을 정의
 */
export type AddMovie = Omit<Movie, 'id'>;

/**
 * Partial<객체>
 * 특정 타입의 부분 집합을 만족하는 타입을 정의
 */
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

  constructor() { }

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

  /**
   * 특정 영화의 데이터를 갱신 합니다.
   * @param movieId 변경할 영화의 아이디
   * @param movie 변경할 영화의 데이터
   * movieIndex : 원본데이터에서 선택된인덱스와 같은 인덱스를 가진 원본데이터
   * find : 객체가능, 조건에 만족하는 첫 번째 요소값을 돌려줌(1개만 찾아줌), 없으면 undefined, 객체 통로 가져옴
   * findIndex : 객체가능, 찾고자 하는 요소의 index를 찾아줌, 없으면 -1
   * indexof : 배열안에 정수,문자, boolean만 가능 찾고자 하는 요소의 첫 번째 index 를 찾아줌, 없으면 -1
   */
  updateMovie(movieId: number, movie: UpadateMovie) {
    // 1. 원본 데이터의 인덱스를 가지고 온다
    const movieIndex = this.movieList$.getValue().findIndex(moive => moive.id === movieId);

    // 1-1. 원본 데이터가 없다면, 해당 함수를 종료해서 필요없는 계산을 방지 할 수 있음.
    if (movieIndex === -1) {
      return;
    }

    // 2. 원본 데이터를 불러온다.
    const originalMovie = this.movieList$.getValue()[movieIndex];

    // 3. 원본 데이터에 바꿀 데이터를 덮어 쓴다.
    const updateMovie = {
      ...originalMovie,
      ...movie
    }

    // 4. 덮어쓴 데이터를 갱신해 준다.
    const updatedMovies = this.movieList$.getValue();
    updatedMovies.splice(movieIndex, 1, updateMovie);

    // 5. 구독 하고있는 컴포넌트들에게 알려주기
    this.movieList$.next(updatedMovies);
  }
}
