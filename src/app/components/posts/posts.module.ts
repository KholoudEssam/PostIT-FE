import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PostCreateComponent } from './post-create/post-create.component';
import { PostListComponent } from './post-list/post-list.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [PostCreateComponent, PostListComponent],
  imports: [CommonModule, ReactiveFormsModule],
})
export class PostsModule {}
