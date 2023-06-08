import { useState, useEffect } from 'react';

type Group = null | {
    id?: number,
    name: string,
    description: string
}

const GroupList = () => {
    const [groups, setGroups] = useState<Array<Group>>([]);

    useEffect(() => {
        fetchGroups();
    }, []);

    const joinGroup = async (groupId: number | undefined) => {
        try {
            const response = await fetch(`http://localhost:8000/groups/${groupId}/join`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Unido al grupo correctamente');
            } else {
                throw new Error('Error al unirse al grupo');
            }
        } catch (error) {
            console.error(error);
        }
    };

    const unlink = async (groupId: number | undefined) => {
        try {
            const response = await fetch(`http://localhost:8000/group/${groupId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                console.log('Grupo eliminado correctamente');
                fetchGroups()
            } else {
                throw new Error('Error al borrar el grupo');
            }
        } catch (error) {
            console.error(error);
        }
    };


    const fetchGroups = async () => {
        try {
            const response = await fetch('http://localhost:8000/groups');
            const data = await response.json();
            setGroups(data);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        groups.length > 0 ? (
            <div>
                <h2>Grupos Disponibles</h2>
                <ul style={{ textDecoration: "none" }}>
                    {groups.map((group) => (
                        <li key={group?.id}>
                            <h3>{group?.name}</h3>
                            <p>{group?.description}</p>
                            <button className="btn btn-info text-white" onClick={() => joinGroup(group?.id)}>Unirse</button> &nbsp;
                            <button className="btn btn-info text-white" onClick={() => unlink(group?.id)}>Eliminar</button>
                        </li>
                    ))}
                </ul>
            </div>
        ) : ( "No se encontraron grupos" )

    );
};

export default GroupList;
