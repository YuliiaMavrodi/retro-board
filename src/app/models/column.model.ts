export interface Comment {
  id: number,
  text: string
}

export interface Task {
  id: number,
  text: string,
  like: number,
  comments: Comment[]
}

export interface Column {
  id: number,
  title: string,
  list: Task[]
}
