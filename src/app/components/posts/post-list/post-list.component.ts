import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../../models/post.model';
@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css'],
})
export class PostListComponent implements OnInit, OnDestroy {
  posts: Post[] = [];
  loading = false;
  private postSub: Subscription;
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {
    this.loading = true;
    this.postsService.getPosts();

    this.postSub = this.postsService
      .postsUpdatedListener()
      .subscribe((data: Post[]) => {
        // console.log(data);
        this.posts = data;
        this.loading = false;
      });
  }

  deletePost(id: string) {
    this.postsService.deletePost(id);
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
