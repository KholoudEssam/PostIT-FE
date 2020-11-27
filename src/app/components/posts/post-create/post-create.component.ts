import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  sub: Subscription;
  editMode: Boolean = false;
  loading = false;
  postId: string;
  editedPost: Post;
  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = this.route.paramMap.subscribe((param) => {
      this.loading = true;
      if (param.has('id')) {
        this.editMode = true;
        this.postId = param.get('id');
        this.postsService.getPost(this.postId).subscribe((post) => {
          this.editedPost = post;
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }

  onSubmitForm(data: NgForm) {
    const post: Post = {
      title: data.value.title,
      content: data.value.content,
    };
    if (this.editMode) {
      this.postsService.updatePost(this.postId, post);
    } else {
      this.postsService.addPosts(post);
    }
    this.router.navigate(['/']);
    data.resetForm();
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
