import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostsService } from 'src/app/services/posts.service';
import { Post } from '../../../models/post.model';
import { mimeType } from './mimeType.validator';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css'],
})
export class PostCreateComponent implements OnInit, OnDestroy {
  sub: Subscription;
  form: FormGroup;
  editMode: Boolean = false;
  loading = false;
  postId: string;
  previewImage: any;

  constructor(
    public postsService: PostsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(5)],
      }),
      content: new FormControl(null, { validators: [Validators.required] }),
      imageUrl: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType],
      }),
    });
    this.sub = this.route.paramMap.subscribe((param) => {
      this.loading = true;
      if (param.has('id')) {
        this.editMode = true;
        this.postId = param.get('id');
        this.postsService.getPost(this.postId).subscribe((post) => {
          // console.log(post);
          this.form.setValue({
            title: post.title,
            content: post.content,
            imageUrl: post.imageUrl,
          });
          this.loading = false;
        });
      } else {
        this.loading = false;
      }
    });
  }

  onImageChange(e) {
    const file = e.target.files[0];
    this.form.patchValue({ imageUrl: file });
    this.form.get('imageUrl').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.previewImage = reader.result;
    };
    reader.readAsDataURL(file);
  }

  onSubmitForm() {
    const post: Post = {
      title: this.form.value.title,
      content: this.form.value.content,
      imageUrl: this.form.value.imageUrl,
    };
    if (this.editMode) {
      this.postsService.updatePost(this.postId, post);
    } else {
      this.postsService.addPosts(post);
    }
    this.form.reset();
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
