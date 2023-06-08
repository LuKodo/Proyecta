import { useEffect, useState } from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import TaskForm from "./components/TaskForm";
import ProjectList from "./components/ProjectList";
import ProjectForm from "./components/ProjectForm";

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Verificar si el nombre de usuario ya está almacenado en el LocalStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    } else {
      localStorage.setItem('username', 'test')
      setUsername('test');
    }
  }, [username]);

  return (
    <div className="container">
      <div className="row">
        <h1 className="h1 fw-bold">Herramienta de Gestión de Tareas y Proyectos</h1>

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/create-task/:idGroup" element={<TaskForm />} />
            <Route path="/edit-task/:idTask" element={<TaskForm />} />

            <Route path="/create-project" element={<ProjectForm />} />
            <Route path="/edit-project/:id" element={<ProjectForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>

  )
}

export default App
