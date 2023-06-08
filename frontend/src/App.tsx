import { useEffect, useState } from "react";
import GroupForm from "./components/GroupForm"
import GroupList from "./components/GroupList";

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
        <div>
          <h1 className="h1 fw-bold">Herramienta de Gestión de Tareas y Proyectos</h1>
          <GroupForm />
          <br />
          <GroupList />
        </div>
    </div>

  )
}

export default App
