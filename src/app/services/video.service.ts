import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Video } from '../interfaces/video.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  constructor(private http: HttpClient) {}

  getAll(): Observable<Video[]> {
    return this.http.get('/allvideos').pipe(
      map((response: any) => {
        if (
          response.data &&
          response.data.videos_log &&
          response.data.videos_log.items
        ) {
          return response.data.videos_log.items;
        }
        return [];
      }),
      catchError(err => {
        return of([]);
      })
    );
  }
}
