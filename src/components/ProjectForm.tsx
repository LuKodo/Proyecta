import Swal from "sweetalert2";
import { useEffect, useState } from 'react'
import { ProjectCreate } from "../types";
import { instance } from "../services/http";

type iParams = {
    idProject: number | null,
    setModalProject: (arg: boolean) => void,
    setIdProjectEdit: (arg: null) => void,
    fetchProjects: () => void
}

const ProjectForm = (params: iParams) => {
    const { idProject, setIdProjectEdit, setModalProject, fetchProjects } = params
    const [project, setGroup] = useState<ProjectCreate>({
        name: ""
    })

    const handleChange = (e: { target: { name: string; value: string; }; }) => {
        setGroup({
            ...project,
            [e.target.name]: e.target.value,
        })
    }

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        if (project.name === "") {
            Swal.fire({
                text: 'Campo Nombre no puede estar vacío',
                timer: 3000,
                toast: true,
                showConfirmButton: false,
                position: "top-end"
            })
            return
        }

        idProject ? (
            instance.patch(`projects/${idProject}`, JSON.stringify(project)).then((response) => {
                if (response.status === 200) {
                    setIdProjectEdit(null)
                    setModalProject(false)
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
            instance.post("projects", JSON.stringify(project)).then((response) => {
                if (response.status === 200) {
                    setIdProjectEdit(null)
                    setModalProject(false)
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
        )
    };

    useEffect(() => {
        if (idProject) {
            instance.get(`project/${idProject}`).then((response) => {
                setGroup(response.data)
            }).catch((error) => {
                Swal.fire({
                    text: error,
                    toast: true,
                    timer: 3000,
                    position: "top-end"
                })
            })
        }
    }, [idProject])

    return (
        <div className="box">
            <div className="column is-12">
                <h2 className='is-size-4 has-text-weight-bold'>{idProject ? "Editar" : "Crear"} Proyecto</h2>
                <form onSubmit={handleSubmit}>
                    <div className="field mt-5">
                        <label className="label">Nombre del Proyecto</label>
                        <div className="control">
                            <input
                                name="name"
                                className="input is-small"
                                type="text"
                                value={project.name}
                                onChange={handleChange}
                            />
                        </div>
                    </div>

                    <button className='button is-small is-primary' type="submit"><i className="bi bi-plus-circle-fill"></i>&nbsp;Crear</button>&nbsp;
                </form>
            </div>
        </div>
    );
};

export default ProjectForm;