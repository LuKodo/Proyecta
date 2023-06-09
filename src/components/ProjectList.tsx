import { Project } from '../types';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { useEffect, useState } from 'react';
import TaskList from './TaskList';

import { fetchProjects } from '../app/actions';
import ProjectForm from './ProjectForm';
import TaskForm from './TaskForm';
import { instance } from '../services/http';

type params = {
    projects: Array<Project>,
    loading: boolean,
    error: string,
    fetchProjects: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
const ProjectList = ({ projects, loading, error, fetchProjects }: params) => {
    const [idProject, setIdProject] = useState<number | null>(null)
    const [idTask, setIdTask] = useState<null | number>(null)

    const [modalProject, setModalProject] = useState<boolean>(false)
    const [modalTask, setModalTask] = useState<boolean>(false)

    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading) {
        return <p>Cargando proyectos...</p>;
    }

    if (error) {
        return <p>Error al cargar proyectos</p>;
    }

    const unlink = (idProject: number) => {
        Swal.fire({
            title: 'Estás seguro?',
            confirmButtonText: "Eliminar",
            showCancelButton: true,
            cancelButtonText: "Cancelar"

        }).then(async (result) => {
            if (result.isConfirmed) {
                instance.delete(`project/${idProject}`).then((response) => {
                    if (response.status === 200) {
                        Swal.fire({
                            title:'Eliminado!',
                            toast: true,
                            timer: 3000,
                            position: "top-end"
                        })
                        fetchProjects()
                    }
                }).catch((error) => {
                    Swal.fire({                        
                        text: error,
                        toast: true, 
                        timer: 3000, 
                        position: "top-end"                   
                    })
                })
            }
        })
    }

    const editProject = () => {
        setIdProject(idProject)
        setModalProject(true)
    }

    const createTask = (idProjectLocal: number) => {
        
        setIdProject(idProjectLocal)
        setModalTask(true)
    }

    return (
        <>
            <div className='columns'>
                <div className="column is-3">
                    <button
                        onClick={() => setModalProject(true)}
                        className="button is-primary is-small u-full-width"
                    >
                        <i className='bi bi-plus-circle-fill'></i>&nbsp;Nuevo Proyecto
                    </button>
                </div>
            </div>
            <div className='columns'>
                {projects && projects.map((project: Project) => (
                    <div className="column is-4-desktop is-12-mobile" key={project?.id}>
                        <div className="card">
                            <header className="card-header">
                                <p className="card-header-title has-text-primary">
                                    {project.name}
                                </p>
                                <button className="card-header-icon" aria-label="more options">
                                    <span className="icon">
                                        <i className="fas fa-angle-down" aria-hidden="true"></i>
                                    </span>
                                </button>
                            </header>
                            <div className="card-content">
                                <div className="content">
                                    <TaskList idTask={idTask} idProject={project.id} />
                                </div>
                            </div>
                            <footer className="card-footer">
                                <button className="card-footer-item tag button is-primary m-2" onClick={() => createTask(project.id)}><i className='bi bi-pencil-square'></i>&nbsp;Crear Tarea</button>
                                <button className="card-footer-item tag button is-warning m-2" onClick={() => editProject()}><i className='bi bi-pencil-square'></i>&nbsp;Editar Proyecto</button>
                                <a className="card-footer-item tag button is-danger m-2" onClick={() => unlink(project.id)}><i className='bi bi-trash-fill'></i>&nbsp;Borrar Proyecto</a>
                            </footer>
                        </div>
                    </div>
                ))}
            </div>

            <div className={`modal ${modalProject ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setModalProject(false)}></div>
                <div className="modal-content">
                    <ProjectForm idProject={idProject} setIdProjectEdit={setIdProject} setModalProject={setModalProject} fetchProjects={fetchProjects} />
                </div>
                <button className="modal-close is-large" onClick={() => setModalProject(false)} aria-label="close"></button>
            </div>

            <div className={`modal ${modalTask ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => setModalTask(false)}></div>
                <div className="modal-content">
                    <TaskForm fetchProjects={fetchProjects} setIdTask={setIdTask} setIdProject={setIdProject} setModalTask={setModalTask} idProject={idProject} idTask={idTask} />
                </div>
                <button className="modal-close is-large" onClick={() => setModalTask(false)} aria-label="close"></button>
            </div>
        </>
    )
}

const mapStateToProps = (state: { project: { projects: Array<Project>; loading: boolean; error: string; }; }) => ({
    projects: state.project.projects,
    loading: state.project.loading,
    error: state.project.error
});

const mapDispatchToProps = {
    fetchProjects
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

