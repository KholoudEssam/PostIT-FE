import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
const modules = [
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatToolbarModule,
  MatExpansionModule,
  MatTooltipModule,
  MatProgressSpinnerModule,
  MatPaginatorModule,
];

@NgModule({
  imports: [CommonModule, ...modules],
  exports: [...modules],
})
export class AppAngularMaterialModule {}
