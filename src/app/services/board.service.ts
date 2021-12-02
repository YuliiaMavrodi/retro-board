import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Column, Comment, Task} from "../models/column.model";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  public board: Column[] = []
  // private board$ = new BehaviorSubject<any[]>([])
  //
  // getBoard$(): any {
  //   return this.board$.asObservable()
  // }


  constructor(private db: AngularFireDatabase) {
  }

  columnsRef!: AngularFireList<any>;
  columnRef!: AngularFireObject<any>;

  tasksRef!: AngularFireList<any>;
  taskRef!: AngularFireObject<any>;

  tasks$ = new BehaviorSubject<Task[]>([])

  commentsRef!: AngularFireList<any>;
  commentRef!: AngularFireObject<any>;

  addColumn(title: string) {
    this.columnsRef.push({title: title, list: this.tasks$})
  }

  getColumn(id: string) {
    this.columnRef = this.db.object('board-list/' + id);
    return this.columnRef;
  }

  getColumnTasks(id: string) {
    this.tasksRef = this.db.list('board-list/' + id + '/list');
    return this.tasksRef;
  }

  getColumnsList() {
    this.columnsRef = this.db.list('board-list');
    return this.columnsRef;
  }

  getTasksComment(columnId: string, taskId: string) {
    this.commentsRef = this.db.list('board-list/' + columnId + '/list/' + taskId + '/comments');
    return this.commentsRef
  }

  deleteColumn(id: string) {
    this.columnRef = this.db.object('board-list/' + id);
    this.columnRef.remove();
  }

  addTask(text: string, columnId: string, like: number = 0, comments: Comment[] = []) {
    this.tasksRef = this.db.list('board-list/' + columnId + '/list');
    this.tasksRef.push({
      text,
      like,
      comments
    })
  }

  deleteTask(taskId: string, columnId: string) {
    this.taskRef = this.db.object('board-list/' + columnId + '/list/' + taskId);
    this.taskRef.remove();
  }


  changeLike(columnId: string, task: Task, increase: boolean) {
    this.taskRef = this.db.object('board-list/' + columnId + '/list/' + task.$id);
    this.taskRef.update({
      like: task.like
    })
  }

  addComment(columnId: string, taskId: string, text: string) {
    this.commentsRef = this.db.list('board-list/' + columnId + '/list/' + taskId + '/comments');
    this.commentsRef.push({
      text,
    })

  }


  deleteComment(commentId: string, columnId: string, taskId: string) {
    this.commentRef = this.db.object('board-list/' + columnId + '/list/' + taskId + '/comments/'+ commentId);
    this.commentRef.remove();

  }
}
