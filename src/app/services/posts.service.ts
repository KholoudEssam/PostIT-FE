import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private apiRoot = 'http://localhost:3000';
  private posts: Post[] = [];
  private postsCount: number;
  private postsUpdated = new Subject<{ posts: Post[]; postsCount: number }>();
  constructor(private _http: HttpClient) {}

  //can listen but cannot emit
  postsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts(pageSize: number, currentPage: number) {
    const queryParams = `?pagesize=${pageSize}&currentpage=${currentPage}`;
    this._http
      .get<{ posts: Post[]; postsCount: number }>(
        `${this.apiRoot}/api/posts${queryParams}`
      )
      .subscribe((data) => {
        this.posts = data.posts;
        this.postsCount = data.postsCount;
        this.postsUpdated.next({
          posts: [...this.posts],
          postsCount: this.postsCount,
        });
      });
    return this.postsUpdatedListener();
  }

  getPost(id) {
    return this._http.get<Post>(`${this.apiRoot}/api/posts/${id}`);
  }

  addPosts(post: FormData) {
    return this._http.post<Post>(`${this.apiRoot}/api/posts`, post);
  }

  updatePost(id: string, updatePost: FormData) {
    return this._http.put<Post>(`${this.apiRoot}/api/posts/${id}`, updatePost);
  }

  deletePost(id: string) {
    return this._http.delete(`${this.apiRoot}/api/posts/${id}`);
  }
}
