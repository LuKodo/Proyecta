import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";

import Swal from 'sweetalert2'
import { Task } from "../types";

const TaskForm = () => {
  const params = useParams()

  const [task, setTask] = useState<Task>({
    id: uuid(),
    title: "",
    description: "",
    state: false,
    group_id: Number(params.idGroup)
  });

  const navigate = useNavigate()

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

    const response = await fetch(`http://localhost:8000/task${params.idTask ? '/'+params.idTask : ''}`, {
      method: params.idTask ? "PATCH" : "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(task)
    });

    if (response.ok) {
      navigate('/')
    } else {
      const data = await response.json();

      Swal.fire({
        title: 'Error!',
        text: data.detail,
        icon: 'error',
      })
    }

    navigate(-2)
  }

  useEffect(() => {
    if (params.idTask) {
      const response = async () => {
        const response = await fetch(`http://localhost:8000/task/${params.idTask}`, {
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
  }, [params])

  return (
    <div className='row'>
      <div className='col-6 p-2'>
        <form onSubmit={handleSubmit}>
          <div className="card border-0">
            <div className="card-header border-0 bg-white">
              <h2 className='h3 fw-bold'>{params.idTask ? "Editar" : "Crear"} Tarea</h2>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <label htmlFor="title">Título:</label>
                <input
                  id="title"
                  type="text"
                  name="title"
                  value={task.title}
                  onChange={handleChange}
                  className='form-control'
                />
              </div>
              <div>
                <label htmlFor="description">Descripción del Grupo:</label>
                <textarea
                  id="description"
                  name="description"
                  value={task.description}
                  onChange={handleChange}
                  className='form-control'
                ></textarea>
              </div>
            </div>
            <div className="card-footer bg-white border-0">
              <button className='btn btn-success' type="submit">
                <i className="bi bi-plus-circle-fill"></i> Guardar
              </button>
              &nbsp;
              <Link
                to="/"
                className="btn btn-secondary"
              >
                <i className='bi bi-arrow-left'></i> Volver
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
