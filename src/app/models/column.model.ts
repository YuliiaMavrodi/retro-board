export interface Comment {
  id: string,
  text: string
}

export interface Task {
  id: string,
  text: string,
  like: number,
  comments: Comment[]
}

export interface Column {
  id: string,
  title: string,
  list: Task[]
}
