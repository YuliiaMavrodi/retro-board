import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardService} from "../../services/board.service";
import {Comment, Task} from "../../models/column.model";

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {

  constructor(
    public boardService: BoardService
  ) { }

  ngOnInit(): void {
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

  onChangeLike(event: {task: Task, increase: boolean}, columnId: number) {
    const { task: { id }, increase} = event
    this.boardService.changeLike(columnId, id, increase)

  }

  onAddComment(event: {id: number, text: string}, columnId: number) {
    this.boardService.addComment(columnId, event.id, event.text)
  }

  onDeleteComment(comment: Comment, columnId: number, itemId: number) {
    this.boardService.deleteComment(comment.id, columnId, itemId)
  }

  onAddTask(text: string, columnId: number) {
    if(text) {
      this.boardService.addTask(text, columnId)
    }
  }

  onDeleteTask(taskId: number, columnId: number) {
    this.boardService.deleteTask(taskId, columnId)
  }

  onDeleteColumn(columnId: number) {
    this.boardService.deleteColumn(columnId)
  }
}
