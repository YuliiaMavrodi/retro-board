import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from "../../models/column.model";
import {BoardService} from "../../services/board.service";

@Component({
  selector: 'app-board-item',
  templateUrl: './board-item.component.html',
  styleUrls: ['./board-item.component.scss']
})
export class BoardItemComponent implements OnInit {

  @Input() task: any
  @Output() emitText: EventEmitter<{ id: string, text: string }> = new EventEmitter()
  @Output() emitTask: EventEmitter<{ task: Task, increase: boolean }> = new EventEmitter()
  @Output() emitDeleteTask: EventEmitter<string> = new EventEmitter()

  commentInput = ''
  open = false

  constructor(
    public boardService: BoardService
  ) {
  }

  ngOnInit(): void {

  }

  onOpenComment() {
    this.open = !this.open
  }

  onCommentTextEmit(id: string) {
    this.emitText.emit({id, text: this.commentInput})
    this.commentInput = ''
  }

  onTaskEmit(task: Task, increase: boolean) {
    this.emitTask.emit({task, increase})
  }

  onTaskDelete(id: string) {
    this.emitDeleteTask.emit(id)
  }
}
