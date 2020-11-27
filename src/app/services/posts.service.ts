import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor(private _http: HttpClient) {}

  //can listen but cannot emit
  postsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  getPosts() {
    this._http
      .get<Post[]>('http://localhost:3000/api/posts')
      .subscribe((data) => {
        this.posts = data;
        this.postsUpdated.next([...this.posts]);
      });
  }

  getPost(id) {
    return this._http.get<Post>(`http://localhost:3000/api/posts/${id}`);
  }

  addPosts(post: Post) {
    this._http
      .post<Post>('http://localhost:3000/api/posts', post)
      .subscribe((data) => {
        this.posts.push(data);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, updatePost: Post) {
    this._http
      .put<Post>(`http://localhost:3000/api/posts/${id}`, updatePost)
      .subscribe((newPost) => {
        this.posts.find((post) => {
          if (post._id === newPost._id) {
            post.title = newPost.title;
            post.content = newPost.content;
          }
        });
      });
  }

  deletePost(id: string) {
    this._http
      .delete(`http://localhost:3000/api/posts/${id}`)
      .subscribe((deletedPost) => {
        this.posts = this.posts.filter((post) => post._id != id);
        this.postsUpdated.next([...this.posts]);
      });
  }
}
