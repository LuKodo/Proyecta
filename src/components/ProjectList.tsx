import { Project } from '../types';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import TaskList from './TaskList';

import { fetchProjects } from '../app/actions';

type params = {
    projects: Array<Project>,
    loading: boolean,
    error: string,
    fetchProjects: () => void
}

// eslint-disable-next-line react-refresh/only-export-components
const ProjectList = ({ projects, loading, error, fetchProjects }: params) => {
    useEffect(() => {
        fetchProjects();
    }, [fetchProjects]);

    if (loading) {
        return <p>Cargando proyectos...</p>;
    }

    if (error) {
        return <p>Error al cargar proyectos</p>;
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
                    const response = await fetch(`https://proyectabackend-1-d0771943.deta.app/group/${id}`, {
                        method: 'DELETE',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    });

                    if (response.ok) {
                        Swal.fire('Eliminado!', '', 'success')
                        fetchProjects()
                    }

                    const data = await response.json()

                    // El proyecto no puede eliminarse si tiene actividades
                    if (response.status === 444) {
                        Swal.fire('Error!', data.detail, 'error')
                    }
                } catch (error) {
                    //throw new Error(error ? error : '')
                }
            }
        })
    };

    return (
        <>
            <div className='row'>
                <div className="col-md-3 col-sm-12 p-2">
                    <Link
                        to="/create-project"
                        className="btn btn-sm btn-success"
                    >
                        <i className='bi bi-plus-circle-fill'></i> Nuevo Proyecto
                    </Link>
                </div>
            </div>
            <div className='row'>
                {projects && projects.map((project: Project) => (
                    <div className='col-lg-4 offset-lg-0 col-md-4 offset-sm-0 col-sm-12 p-2' key={project?.id}>
                        <div className="card">
                            <div className="card-header bg-white">
                                <p className='fw-bold h4 mb-0'>
                                    {project?.name}
                                </p>
                            </div>
                            <div className="card-body">
                                <TaskList id={Number(project.id)} />
                            </div>
                            <div className="card-footer bg-white">
                                <Link className="btn btn-sm btn-success text-white" to={`/edit-project/${project.id}`}><i className='bi bi-pencil-square'></i> Editar</Link> &nbsp;

                                <button className="btn btn-sm btn-danger text-white" onClick={() => unlink(project.id)}><i className='bi bi-trash-fill'></i> Borrar</button>

                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

const mapStateToProps = (state: { project: { projects: any; loading: any; error: any; }; }) => ({
  projects: state.project.projects,
  loading: state.project.loading,
  error: state.project.error
});

const mapDispatchToProps = {
    fetchProjects
};

// eslint-disable-next-line react-refresh/only-export-components
export default connect(mapStateToProps, mapDispatchToProps)(ProjectList);

