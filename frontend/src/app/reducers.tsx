const initialState = {
  projects: [],
  loading: false,
  error: null
};

export const projectReducer = (state = initialState, action: { type: string; payload: string; }) => {
  switch (action.type) {
    case 'FETCH_PROJECTS_REQUEST':
      return { ...state, loading: true, error: null };
    case 'FETCH_PROJECTS_SUCCESS':
      return { ...state, loading: false, projects: action.payload };
    case 'FETCH_PROJECTS_FAILURE':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default projectReducer;
