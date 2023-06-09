import { useEffect, useState } from "react";
import ProjectList from "./components/ProjectList";

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
      <div className="columns">
        <div className="column is-half">
          <h1 className="is-size-3 has-text-weight-bold">Herramienta de Gestión de Tareas y Proyectos</h1>
        </div>
      </div>
      
      <ProjectList />

    </div>
  )
}

export default App
