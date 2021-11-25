import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardService} from "../../services/board.service";
import {Column, Comment, Task} from "../../models/column.model";
import { CrudService } from 'src/app/services/crud.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  column?: Column[]

  constructor(
    public boardService: BoardService,
  ) { }

  ngOnInit(): void {
    // this.boardService.getColumnList().subscribe(res => {
    //   this.column = res.map( e => {
    //     return{
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data() as{}
    //     } as Column
    //   })
    // })
  }

  drop(event: CdkDragDrop<string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onChangeLike(event: {task: Task, increase: boolean}, columnId: string) {
    const { task: { id }, increase} = event
    this.boardService.changeLike(columnId, id, increase)

  }

  onAddComment(event: {id: string, text: string}, columnId: string) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment: Comment, columnId: string, itemId: string) {
    this.boardService.deleteComment(comment.id, columnId, itemId)
  }

  onAddTask(text: string, columnId: string) {
    if(text) {
      this.boardService.addTask(text, columnId)
    }
  }

  onDeleteTask(taskId: string, columnId: string) {
    this.boardService.deleteTask(taskId, columnId)
  }

  onDeleteColumn(column: Column) {
    // this.boardService.getColumnList().subscribe(res => {
    //   this.Column = res.map( e => {
    //     return{
    //       id: e.payload.doc.id,
    //       ...e.payload.doc.data() as{}
    //     } as Column
    //   })
    // })


    this.boardService.deleteColumn(column)
  }
}
