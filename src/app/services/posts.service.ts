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
    const postData = new FormData();
    postData.append('title', post.title);
    postData.append('content', post.content);
    postData.append('imageUrl', post.imageUrl);

    this._http
      .post<Post>('http://localhost:3000/api/posts', postData)
      .subscribe((data) => {
        this.posts.push(data);
        this.postsUpdated.next([...this.posts]);
      });
  }

  updatePost(id: string, updatePost: Post) {
    let postData: Post | FormData;
    if (typeof updatePost.imageUrl === 'object') {
      postData = new FormData();
      postData.append('title', updatePost.title);
      postData.append('content', updatePost.content);
      postData.append('imageUrl', updatePost.imageUrl);
    } else {
      postData = updatePost;
    }

    this._http
      .put<Post>(`http://localhost:3000/api/posts/${id}`, postData)
      .subscribe((newPost) => {
        this.posts.find((post) => {
          if (post._id === newPost._id) {
            post.title = newPost.title;
            post.content = newPost.content;
            post.imageUrl = newPost.imageUrl;
          }
        });
        this.postsUpdated.next(this.posts);
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
