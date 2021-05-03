import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
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

  currentPage: number;
  postsPerPage: number;
  postsLength: number;
  pageSizeOptions = [2, 4, 6, 10];

  private postSub: Subscription;

  constructor(public postsService: PostsService) {
    this.currentPage = 1;
    this.postsPerPage = +localStorage.getItem('postsPerPage') || 2;
  }

  ngOnInit(): void {
    this.loading = true;
    this.postSub = this.postsService
      .getPosts(this.postsPerPage, this.currentPage)
      .subscribe(({ posts, postsCount }) => {
        this.posts = posts;
        this.postsLength = postsCount;
        this.loading = false;
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
    this.postsService.deletePost(id).subscribe((deletedPost) => {
      this.postsService.getPosts(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postSub.unsubscribe();
  }
}
