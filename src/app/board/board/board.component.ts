import {Component, OnChanges, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {BoardService} from "../../services/board.service";
import {Column, Comment, Task} from "../../models/column.model";
import {TutorialService} from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss']
})
export class BoardComponent implements OnInit {
  noData: boolean = false;
  preLoader: boolean = true;

  constructor(
    public boardService: BoardService,
  ) {
  }

  ngOnInit(): void {
    this.dataState();
    let columns = this.boardService.getColumnsList();
    columns.snapshotChanges().subscribe(data => {
      this.boardService.board = []
      data.forEach(item => {
        let a = item.payload.toJSON();
        // @ts-ignore
        a['$id'] = item.key;
        // @ts-ignore
        a['list'] = []
        this.boardService.board.push(a as Column);
        this.taskState(a as Column)
        // }
      })
      console.log(this.boardService.board)
    })

  }

  dataState() {
    this.boardService.getColumnsList().valueChanges().subscribe(data => {
      this.preLoader = false;
      if (data.length <= 0) {
        this.noData = true;
      } else {
        this.noData = false;
      }
    })
  }

  taskState(column: Column) {
    let task = this.boardService.getColumnTasks(column?.$id);
    task.snapshotChanges().subscribe(data => {
      // column.list = []
      data.forEach(item => {
        let a = item.payload.toJSON();
        // @ts-ignore
        a['$id'] = item.key;
        // @ts-ignore
        a['comments'] = []
        column.list = [a as Task, ...column.list]
        this.commentState(column, a as Task)
      })
    })
  }

  commentState(column: Column, task: Task) {
    let comment = this.boardService.getTasksComment(column.$id, task.$id);
    comment.snapshotChanges().subscribe(data => {
      // task.comments = []
      data.forEach(item => {
        let a = item.payload.toJSON();
        // @ts-ignore
        a['id'] = item.key;
        task.comments = [a as Comment, ...task.comments]
      })
    })

  }

  drop(event: CdkDragDrop<string[] | any>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const task = event.previousContainer.data[event.previousIndex];
      this.boardService.deleteTask(task.$id, event.previousContainer.id)
      this.boardService.addTask(task.text, event.container.id)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onChangeLike(event: { task: Task, increase: boolean }, column: Column) {
    const {task: {$id}, increase} = event
    this.boardService.changeLike(column.$id, $id, increase)

  }

  onAddComment(event: { id: string, text: string }, column: Column) {
    column.list.map(task => {
      let comment = this.boardService.getTasksComment(column.$id, task.$id);
      comment.snapshotChanges().subscribe(data => {
        task.comments = []
        console.log('task', task)
        data.forEach(item => {
          let a = item.payload.toJSON();
          // @ts-ignore
          a['id'] = item.key;
          // column.list.push(a as Task);
          task.comments = [a as Comment, ...task.comments]
          // this.boardService.board$.next([...this.boardService.board])
        })
      })

    })
    this.boardService.addComment(column.$id, event.id, event.text)
  }

  onDeleteComment(comment: Comment, columnId: string, itemId: string) {
    this.boardService.deleteComment(comment.id, columnId, itemId)
  }

  onAddTask(text: string, column: Column) {
    if (text) {
      this.boardService.addTask(text, column.$id)
    }
  }

  onDeleteTask(taskId: string, columnId: string) {
    this.boardService.deleteTask(taskId, columnId)
  }

  onDeleteColumn(columnId: string) {
    this.boardService.deleteColumn(columnId)
  }
}
