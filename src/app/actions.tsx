import { instance } from "../services/http";

export const fetchProjects = () => {
    return async (dispatch: (arg0: { type: string; payload?: unknown; }) => void) => {
        dispatch({ type: 'FETCH_PROJECTS_REQUEST' });

        instance.get(`projects`).then((response) => {
            if (response.status === 200) {
                dispatch({ type: 'FETCH_PROJECTS_SUCCESS', payload: response.data });
            }
        }).catch((error) => {
            dispatch({ type: 'FETCH_PROJECTS_FAILURE', payload: error });
        })

    };
};
