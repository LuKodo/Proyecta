import Swal from "sweetalert2";
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import { v4 as uuid } from "uuid";
import { Project } from "../types";

const ProjectForm = () => {
    const params = useParams()

    const [project, setGroup] = useState<Project>({
        id: uuid(),
        name: ""
    });

    const navigate = useNavigate()

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

        const response = await fetch(`https://proyectabackend-1-d0771943.deta.app/groups${params.id ? "/" + params.id : ''}`, {
            method: params.id ? "PATCH" : "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
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
        navigate('/')
    };

    useEffect(() => {
        if (params.id) {
            const response = async () => {
                const response = await fetch(`https://proyectabackend-1-d0771943.deta.app/group/${params.id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.ok) {
                    const data = await response.json();
                    setGroup(data)
                }
            }
            response()
        }
    }, [params])

    return (
        <div className="col-lg-3 col-sm-12">
            <h2 className='h3 fw-bold'>{params.id ? "Editar" : "Crear"} Proyecto</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="groupName">Nombre del Proyecto:</label>
                    <input
                        name="name"
                        type="text"
                        id="groupName"
                        value={project.name}
                        onChange={handleChange}
                        className='form-control'
                    />
                </div>
                <button className='btn btn-success' type="submit"><i className="bi bi-plus-circle-fill"></i> Crear</button>
            </form>
        </div>
    );
};

export default ProjectForm;