import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../models/post.model';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit {
  constructor(public postsService: PostsService) {}

  ngOnInit(): void {}

  onAddPost(data: NgForm) {
    const newPost: Post = {
      title: data.value.title,
      content: data.value.content,
    };
    this.postsService.addPosts(newPost);
    data.resetForm();
  }
}
