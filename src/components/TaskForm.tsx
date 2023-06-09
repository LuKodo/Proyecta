import { useEffect, useState } from "react";

import Swal from 'sweetalert2'
import { Task } from "../types";
import { instance } from "../services/http";

type iParams = {
  idProject: number | null,
  idTask: number | null,
  setIdProject: (arg: null) => void,
  setIdTask: (arg: null) => void,
  setModalTask: (arg: boolean) => void,
  fetchProjects: () => void
}

const TaskForm = (params: iParams) => {
  const { idProject, idTask, setIdProject, setIdTask, setModalTask, fetchProjects } = params
  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
    state: false,
    project_id: idProject
  })

  const handleChange = (e: { target: { name: string; value: string; }; }) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault()
    if (task.title === "") {
      Swal.fire({
        text: 'Campo Título no puede estar vacío',
        timer: 3000,
        toast: true,
        showConfirmButton: false,
        position: "top-end"
      })
      return
    }

    idTask ? (
      instance.patch(`task/${idTask}`, JSON.stringify(task)).then((response) => {
        if (response.status === 200) {
          setIdProject(null)
          setModalTask(false)
          fetchProjects()
        }
      }).catch((error) => {
        Swal.fire({
          toast: true,
          text: error,      
          timer: 3000,  
          position: "top-end"  
        })
      })
    ) : (
      instance.post("task", JSON.stringify(task)).then((response) => {
        if (response.status === 200) {
          setIdProject(null)
          setIdTask(null)
          setModalTask(false)
          fetchProjects()
        }
      }).catch((error) => {
        Swal.fire({
          toast: true,
          text: error,          
          timer: 3000,
          position: "top-end"
        })
      })
    )
  }

  useEffect(() => {
    if (idTask) {
      const response = async () => {
        const response = await fetch(`http://localhost:8000/task/${idTask}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.ok) {
          const data = await response.json();
          setTask(data)
        }
      }
      response()
    }
  }, [])

  return (
    <div className="box">
      <div className='column is-12'>
        <h2 className='is-size-4 has-text-weight-bold'>{params.idTask ? "Editar" : "Crear"} Tarea</h2>
        <form onSubmit={handleSubmit}>
          <div className="field mt-5">
            <label className="label">Título:</label>
            <div className="control">
              <input
                id="title"
                type="text"
                name="title"
                value={task.title}
                onChange={handleChange}
                className='input is-small'
              />
            </div>
          </div>
          <div className="field">
            <label className="label">Descripción del Grupo:</label>
            <textarea
              id="description"
              name="description"
              value={task.description}
              onChange={handleChange}
              className='textarea is-small'
            ></textarea>
          </div>

          <button className='button is-small is-primary' type="submit">
            <i className="bi bi-plus-circle-fill"></i>&nbsp;Guardar
          </button>

        </form>
      </div >
    </div >
  )
};

export default TaskForm;
