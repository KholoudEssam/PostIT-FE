import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Post } from '../models/post.model';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();
  constructor() {}

  getPosts() {
    //to return just a copy
    return [...this.posts];
  }

  //can listen but cannot emit
  postsUpdatedListener() {
    return this.postsUpdated.asObservable();
  }

  addPosts(post: Post) {
    this.posts.push(post);

    this.postsUpdated.next([...this.posts]);
  }
}
