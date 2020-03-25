import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map, catchError } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { throwError } from 'rxjs';

const BASE_URL = '';

@Injectable({ providedIn: 'root' })
export class PostService {
  constructor(private http: HttpClient) {}

  createPost(post: Post) {
    return this.http.post<{ name: string }>(`${BASE_URL}posts.json`, post);
  }

  fetchPosts() {
    return this.http.get<{ [key: string]: Post }>(`${BASE_URL}posts.json`).pipe(
      map(response => {
        const posts: Post[] = [];
        /** Convert object to array  */
        for (const key in response) {
          if (response.hasOwnProperty(key)) {
            posts.push({ ...response[key], id: key });
          }
        }
        return posts;
      }),
      catchError(error => {
        // ... do some logic
        return throwError(error);
      })
    );
  }

  deletePosts() {
    return this.http.delete(`${BASE_URL}posts.json`);
  }
}
