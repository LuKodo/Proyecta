import { useState } from 'react';
import Swal from 'sweetalert2'

const GroupForm = () => {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/groups', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: groupName,
          description: groupDescription
        })
      });

      if (response.ok) {        
        Swal.fire({
          title: 'Error!',
          text: "Grupo registrado con exito",
          icon: 'success',
        })

        // Reiniciar los campos del formulario
        setGroupName('');
        setGroupDescription('');
      } else {
        const data = await response.json();
        
        Swal.fire({
          title: 'Error!',
          text: data.detail,
          icon: 'error',
        })
      }
    } catch (error) {
      console.error(error); // Manejo de errores en caso de que ocurra algún problema
    }
  };

  return (
    <div>
      <h2 className='h3 fw-bold'>Crear Grupo</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="groupName">Nombre del Grupo:</label>
          <input
            type="text"
            id="groupName"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            className='form-control'
          />
        </div>
        <div className="mb-3">
          <label htmlFor="groupDescription">Descripción del Grupo:</label>
          <textarea
            id="groupDescription"
            value={groupDescription}
            onChange={(e) => setGroupDescription(e.target.value)}
            className='form-control'
          ></textarea>
        </div>
        <button className='btn btn-success' type="submit">Crear Grupo</button>
      </form>
    </div>
  );
};

export default GroupForm;
