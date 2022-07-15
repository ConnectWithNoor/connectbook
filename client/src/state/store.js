import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

const saveToLocalStorage = (store) => {
  const serializedStore = JSON.stringify(store);
  localStorage.setItem('store', serializedStore);
};

const loadFromLocalStorage = () => {
  const serializedStore = JSON.parse(localStorage.getItem('store'));

  if (!serializedStore) return undefined;

  return serializedStore;
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistState,
  composeEnhancers(applyMiddleware(thunk))
);

// store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
