import {Injectable} from "@angular/core";
import {BehaviorSubject} from "rxjs";
import {Column, Comment, Task} from "../models/column.model";

@Injectable({
  providedIn: 'root'
})
export class BoardService {
  private initBoard = [
    {
      id: 1,
      title: 'To Do',
      list: [
        {
          id: 1,
          text: 'Example1 card item',
          like: 1,
          comments: [
            {
              id: 1,
              text: 'Some comment'
            }
          ]
        },
        {
          id: 2,
          text: 'Example2 card item',
          like: 5,
          comments: [
            {
              id: 1,
              text: 'Some comment'
            }
          ]
        }
      ]
    },
    {
      id: 2,
      title: 'In Progress',
      list: [
        {
          id: 2,
          text: 'Example card item',
          like: 3,
          comments: [
            {
              id: 1,
              text: 'Some comment'
            },
            {
              id: 2,
              text: 'Some comment2'
            },
            {
              id: 3,
              text: 'Some comment3'
            }
          ]
        }
      ]
    },

  ]
  public board: Column[] = this.initBoard
  // private board$ = new BehaviorSubject<any[]>(this.initBoard)
  //
  // getBoard$(): any {
  //   return this.board$.asObservable()
  // }

  addColumn(title: string) {
    const newColumn: Column = {
      id: Date.now(),
      title: title,
      list: []
    }
    this.board = [...this.board, newColumn]
  }

  deleteColumn(columnId: number) {
    this.board = this.board.filter((column: Column) => column.id !== columnId)
  }


  addTask(text: string, columnId: number) {
    const newTask: Task = {
      id: Date.now(),
      text,
      like: 0,
      comments: []
    }

    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = [newTask, ...column.list]
      }
      return column

    })
  }

  deleteTask(taskId: number, columnId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        column.list = column.list.filter(((task: Task) => task.id !== taskId))
      }
      return column
    })
  }


  changeLike(columnId: number, taskId: number, increase: boolean) {
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

  addComment(columnId: number, taskId: number, text: string) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((task: Task) => {
          if (task.id === taskId) {
            const newComment = {
              id: Date.now(),
              text,
            }
            task.comments = [newComment, ...task.comments]
          }
          return task
        })
        column.list = list
      }
      return column
    })
  }


  deleteComment(commentId: number, columnId: number, taskId: number) {
    this.board = this.board.map((column: Column) => {
      if (column.id === columnId) {
        const list = column.list.map((task: Task) => {
          if (task.id === taskId) {
            task.comments = task.comments.filter((comment: Comment) => comment.id !== commentId)
          }
          return task
        })
        column.list = list
      }
      return column
    })
  }

}
