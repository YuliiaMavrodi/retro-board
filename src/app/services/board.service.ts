import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Column, Comment, Task} from "../models/column.model";
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {AngularFireDatabase, AngularFireList, AngularFireObject} from "@angular/fire/compat/database";

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  constructor(private angularFirestore: AngularFirestore, private db: AngularFireDatabase) {
  }

  private initBoard = [
    {
      id: '1',
      title: 'To Do',
      list: [
        {
          id: '1',
          text: 'Example1 card item',
          like: 1,
          comments: [
            {
              id: '1',
              text: 'Some comment'
            }
          ]
        },
        {
          id: '2',
          text: 'Example2 card item',
          like: 5,
          comments: [
            {
              id: '1',
              text: 'Some comment'
            }
          ]
        }
      ]
    },
    {
      id: '2',
      title: 'In Progress',
      list: [
        {
          id: '2',
          text: 'Example card item',
          like: 3,
          comments: [
            {
              id: '1',
              text: 'Some comment'
            },
            {
              id: '2',
              text: 'Some comment2'
            },
            {
              id: '3',
              text: 'Some comment3'
            }
          ]
        }
      ]
    },

  ]
  public board: Column[] = this.initBoard
  public board$ = new BehaviorSubject<Column[]>(this.initBoard)
  getBoard$() {
    return this.board$.asObservable()
  }
  // public board = this.getColumnList()

  // public fireBoard: any = null
  // private board$ = new Promise<Column[]>()
  //
  // getBoard$(): any {
  //   return this.board$.asObservable()
  // }


  // getColumnDoc(id: string) {
  //   return this.angularFirestore
  //     .collection('board-collection')
  //     .doc(id)
  //     .valueChanges()
  // }

  // getColumnList() {
  //   return this.angularFirestore
  //     .collection('board-collection')
  //     .snapshotChanges()
  // }

  // addColumn(title: string) {
  //   const newColumn: Column = {
  //     id: Date.now().toString(),
  //     title: title,
  //     list: []
  //   }
  //
  //   return new Promise<any>((response, reject) => {
  //     this.angularFirestore
  //       .collection('board-collection')
  //       .add(newColumn)
  //       .then(response => {
  //           this.board = [...this.board, newColumn];
  //           this.board$.next([...this.board]);
  //           console.log(response)
  //         },
  //         error => reject(error))
  //   })
  // }

  columnsRef!: AngularFireList<any>;
  columnRef!: AngularFireObject<any>;

  GetColumn(id: string) {
    this.columnRef = this.db.object('board-collection/' + id);
    return this.columnRef;
  }

  // Fetch Students List
  GetColumnsList() {
    this.columnsRef = this.db.list('board-collection');
    return this.columnsRef;
  }


  addColumn(title: string) {
      this.columnsRef
        .push({
          title: title,
          list: []
        })
  }





  deleteColumn(column: Column) {




    // this.board = this.board.filter((column: Column) => column.id !== columnId);
    // this.board$.next([...this.board]);

    return this.angularFirestore
      .collection('board-collection')
      .doc(column.id)
      .delete()
  }


  addTask(text: string, columnId: string) {
    const newTask: Task = {
      id: Date.now().toString(),
      text,
      like: 0,
      comments: []
    }

    // return new Promise<any>((response, reject) => {
    //   this.angularFirestore
    //     .collection('board-collection')
    //
    // })
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newTask, ...column.list]
        // this.angularFirestore
        //   .collection('board-collection')
        //   .doc(column)
        //   .collection('list')
        //   .add(newTask)
      }
      return column

    })
  }

  deleteTask(taskId: string, columnId: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter(((task: Task) => task.id !== taskId))
      }
      return column
    })
  }


  changeLike(columnId: string, taskId: string, increase: boolean) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((task: Task) => {
          if (task.id === taskId) {
            if (increase) {
              task.like++
            } else if (task.like > 0) {
              task.like--
            }
          }
          return task
        })
        column.list = list
      }
      return column
    })
  }

  addComment(columnId: string, taskId: string, text: string) {
    // this.board = this.board.map((column: Column) => {
    //   if (column.id === columnId) {
    //     const list = column.list.map((task: Task) => {
    //       if (task.id === taskId) {
    //         const newComment = {
    //           // id: Date.now(),
    //           text,
    //         }
    //         task.comments = [newComment, ...task.comments]
    //       }
    //       return task
    //     })
    //     column.list = list
    //   }
    //   return column
    // })
  }


  deleteComment(commentId: string, columnId: string, taskId: string) {
    // this.board = this.board.map((column: Column) => {
    //   if (column.id === columnId) {
    //     const list = column.list.map((task: Task) => {
    //       if (task.id === taskId) {
    //         task.comments = task.comments.filter((comment: Comment) => comment.id !== commentId)
    //       }
    //       return task
    //     })
    //     column.list = list
    //   }
    //   return column
    // })
  }


}
function reject(error: any): any {
    throw new Error("Function not implemented.");
}

