import { legacy_createStore as createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import projectReducer from './reducers';

// Combina los reductores si tienes más de uno
const rootReducer = combineReducers({
  project: projectReducer
  // Agrega aquí otros reductores si los tienes
});

// Configura el store con los reductores y los middlewares
const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
