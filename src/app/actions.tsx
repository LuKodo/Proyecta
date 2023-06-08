export const fetchProjects = () => {
    return async (dispatch: (arg0: { type: string; payload?: unknown; }) => void) => {
        dispatch({ type: 'FETCH_PROJECTS_REQUEST' });

        try {
            const response = await fetch(`proyectabackend-1-d0771943.deta.app/groups`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json()
            dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: data });
        } catch (error) {
            dispatch({ type: 'FETCH_PROJECTS_FAILURE', payload: 'Error al cargar la información' });
        }
    };
};
