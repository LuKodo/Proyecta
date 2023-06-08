import { useEffect, useState } from "react";
import Swal from 'sweetalert2'
import GroupForm from "./components/GroupForm"

function App() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    // Verificar si el nombre de usuario ya está almacenado en el LocalStorage
    const storedUsername = localStorage.getItem('username');
    if (storedUsername) {
      setUsername(storedUsername);
    }
  }, [username]);

  const handleUsernameSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    // Guardar el nombre de usuario en el LocalStorage
    localStorage.setItem('username', username);
  };

  return (
    <div className="container">
      {!username ? (
        <form onSubmit={handleUsernameSubmit}>
          <label htmlFor="username">Ingresa tu nombre de usuario:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <button onClick={handleUsernameSubmit} type="submit">Guardar</button>
        </form>
      ) : (
        // Renderizar el resto de la aplicación
        <div>
          <h1 className="h1 fw-bold">Herramienta de Gestión de Tareas y Proyectos</h1>
          <GroupForm />
        </div>
      )}
    </div>

  )
}

export default App
