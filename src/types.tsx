export type Task = {
  id?: number,
  title: string,
  description: string,
  state: boolean,
  project_id: number | undefined | null
}

export type Project = {
  id: number,
  name: string
}

export type ProjectCreate = {
  name: string
}

export type iTask = { idTask: number | null, idProject: number | null | undefined }