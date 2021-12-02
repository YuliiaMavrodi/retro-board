import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import {HeaderModule} from "../header/header.module";
import {BoardModule} from "../board/board.module";



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
    BoardModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class HomePageModule { }
