import { Task, iTask } from '../types';
import Swal from 'sweetalert2';
import { useEffect, useState } from 'react';
import { instance } from '../services/http';



const TaskList = (params: iTask) => {
    const { idTask, idProject } = params
    const [tasks, setTasks] = useState<Array<Task> | undefined>(undefined)

    useEffect(() => {
        loadTasks()
    }, [])

    const loadTasks = async () => {
        instance.get(`tasks/${idProject}`).then((response) => {
            if (response.status === 200) {
                setTasks(response.data)
            }
        }).catch((error) => {
            Swal.fire({
                toast: true,
                text: error,
                timer: 3000,
                position: "top-end"
            })
        })
    };

    const changeChecked = async (task: Task) => {
        const response = await fetch(`http://localhost:8000/task/${task.id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                id: task.id,
                title: task.title,
                description: task.description,
                state: !task.state,
                project_id: task.project_id
            })
        });

        if (!response.ok) {
            const data = await response.json();

            Swal.fire({
                toast: true,
                timer: 3000,
                text: data.detail,
                position: "top-end"
            })
        } else {
            loadTasks()
        }
    }


    const unlink = (id: number | undefined) => {
        Swal.fire({
            title: 'Estás seguro?',
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"

        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    const response = await fetch(`http://localhost:8000/task/${id}`, {
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
                Swal.fire({
                    title: 'Eliminado!',
                    toast: true,
                    timer: 3000,
                    position: "top-end"
                })
            }

        })
    };

    return (
        <>
            {tasks === undefined ? (
                <p className="placeholder-glow">
                    <span className="placeholder col-12"></span>
                </p>
            ) :
                tasks?.length > 0 ? (
                    <>
                        <table className='table is-bordered is-striped is-narrow is-hoverable is-fullwidth'>
                            <thead>
                                <tr>
                                    <td className='has-text-weight-bold'>Actividad</td>
                                    <td className='has-text-weight-bold'>Acciones</td>
                                </tr>
                            </thead>
                            <tbody>
                                {tasks.map((task: Task, index) => (
                                    <tr className="list-project-item d-flex justify-content-between align-items-start" key={task.id}>
                                        <td className="ms-2 me-auto">
                                            <div className={`has-text-semibold ${task.state ? 'has-text-grey-light' : ''}`} style={{ textDecoration: task.state ? 'line-through' : 'none' }}>{index + 1}. {task.title}</div>
                                        </td>
                                        <td colSpan={3}>
                                            <button className='button is-info is-small mr-1' onClick={() => { changeChecked(task) }}>
                                                {task.state ?
                                                    (<i className='bi bi-arrow-clockwise'></i>) :
                                                    (<i className='bi bi-check-all'></i>)
                                                }
                                            </button>
                                            <button className='button is-warning is-small mr-1'>
                                                <i className='bi bi-pencil-fill'></i>
                                            </button>
                                            <button className='button is-danger is-small' onClick={() => unlink(task.id)}>
                                                <i className='bi bi-trash'></i>
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                ) : (<>"Este grupo no tiene tareas, deberias crear una"</>)
            }
        </>
    )
}

export default TaskList;
