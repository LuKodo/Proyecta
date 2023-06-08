import { Task } from '../types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';

const TaskList = (params: { id: number }) => {
    const { id } = params
    const [tasks, setTasks] = useState<Array<Task> | undefined>(undefined)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        try {
            const response = await fetch(`proyectabackend-1-d0771943.deta.app/tasks/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                const data = await response.json()
                setTasks(data)

            } else {
                throw new Error('Error al cargar la información');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const changeChecked = async (task: Task) => {
        const response = await fetch(`proyectabackend-1-d0771943.deta.app/task/${task.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                state: !task.state,
                group_id: task.group_id
            })
        });

        if (!response.ok) {
            const data = await response.json();

            Swal.fire({
                title: 'Error!',
                text: data.detail,
                icon: 'error',
            })
        } else {
            loadTasks()
        }
    }


    const unlink = (id: string) => {
        Swal.fire({
            title: 'Eliminando Grupo',
            icon: "warning",
            text: "Estás seguro?",
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"

        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`proyectabackend-1-d0771943.deta.app/task/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        loadTasks()
                    } else {
                        throw new Error('Error al borrar la tarea');
                    }
                } catch (error) {
                    console.error(error);
                }
                Swal.fire('Eliminado!', '', 'success')
            }

        })
    };

    return (
        <>
            <div className='row'>
                <div className="col">
                    <Link
                        to={`/create-task/${params.id}`}
                        className="btn btn-sm btn-success"
                    >
                        <i className='bi bi-plus-circle-fill'></i> Crear Tarea
                    </Link>
                </div>
            </div>
            {tasks === undefined ? (
                <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                </p>
            ) :
                tasks?.length > 0 ? (
                    <>
                        <ul className="list-project mt-2">
                            {tasks.map((task: Task, index) => (
                                <li className="list-project-item d-flex justify-content-between align-items-start" key={task.id}>
                                    <div className="ms-2 me-auto">
                                        <div className={`fw-bold ${task.state ? 'text-success text-decoration-line-through' : ''}`}>{index+1}. {task.title}</div>
                                    </div>
                                    <div className="p-1">
                                        <button className='btn btn-info btn-sm' onClick={() => { changeChecked(task) }}>
                                            {task.state ?
                                                (<i className='bi bi-arrow-clockwise'></i>) :
                                                (<i className='bi bi-check-all'></i>)
                                            }
                                        </button>
                                    </div>
                                    <div className="p-1">
                                        <Link to={`/edit-task/${task.id}`} className='btn btn-warning btn-sm'>
                                            <i className='bi bi-pencil-fill'></i>
                                        </Link>
                                    </div>
                                    <div className="p-1">
                                        <button className='btn btn-danger btn-sm' onClick={() => unlink(task.id)}>
                                            <i className='bi bi-trash'></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </>
                ) : (<>"Este grupo no tiene tareas, deberias crear una"</>)
            }
        </>
    )
}

export default TaskList;
