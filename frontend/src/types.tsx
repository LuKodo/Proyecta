export type Task = {
  id: string,
  title: string,
  description: string,
  state: boolean,
  group_id: number | undefined
}

export type Project = {
  id: string,
  name: string
}