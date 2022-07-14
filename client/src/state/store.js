import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
} from 'redux';
import thunk from 'react-redux';
import reducers from './reducers';

const saveToLocalStorage = (store) => {
  const serializedStore = JSON.stringify(store);
  localStorage.setItem('store', serializedStore);
};

const loadFromLocalStorage = () => {
  const serializedStore = JSON.parse(localStorage.getItem('store'));

  if (!serializedStore) return null;

  return serializedStore;
};

const persistState = loadFromLocalStorage();

const store = createStore(
  reducers,
  persistState,
  compose(applyMiddleware(thunk))
);

store.subscribe(() => saveToLocalStorage(store.getState()));

export default store;
