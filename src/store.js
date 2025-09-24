import { configureStore } from '@reduxjs/toolkit';
import dashboardReducer from './slices/dashboardSlice';

const STORAGE_KEY = 'dashboard_state_v1';

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return undefined;
    return JSON.parse(raw);
  } catch (e) {
    console.warn('Failed to load state', e);
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serial = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serial);
  } catch (e) {
    console.warn('Failed to save state', e);
  }
};

const preloaded = loadState();

const store = configureStore({
  reducer: { dashboard: dashboardReducer },
  preloadedState: preloaded
});

store.subscribe(() => {
  saveState(store.getState());
});

export default store;
