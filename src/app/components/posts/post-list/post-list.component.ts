import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
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

  currentUserId: string;

  currentPage: number;
  postsPerPage: number;
  postsLength: number;
  pageSizeOptions = [2, 4, 6, 10];

  private postSub: Subscription;
  private authSub: Subscription;
  isAuth: boolean;

  constructor(
    public postsService: PostsService,
    private authService: AuthService
  ) {
    this.currentPage = 1;
    this.postsPerPage = +localStorage.getItem('postsPerPage') || 2;
    this.currentUserId = localStorage.getItem('userId');
  }

  ngOnInit(): void {
    this.loading = true;
    this.postSub = this.postsService
      .getPosts(this.postsPerPage, this.currentPage)
      .subscribe(({ posts, postsCount }) => {
        this.posts = posts;
        this.postsLength = postsCount;
        this.loading = false;
        console.log(posts);
      });
    this.authSub = this.authService.isAuth.subscribe((res) => {
      this.isAuth = res;
      console.log(res);
    });
  }

  onPageChange(page: PageEvent) {
    localStorage.setItem('postsPerPage', page.pageSize.toString());
    this.loading = true;
    this.currentPage = page.pageIndex + 1;
    this.postsPerPage = page.pageSize;
    this.postsService.getPosts(this.postsPerPage, this.currentPage);
  }

  deletePost(id: string) {
    this.loading = true;
    this.postsService.deletePost(id).subscribe(
      () => {
        this.postsService.getPosts(this.postsPerPage, this.currentPage);
      },
      (err) => {
        alert(err.error.msg);
        this.loading = false;
      }
    );
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
    this.authSub.unsubscribe();
  }
}
