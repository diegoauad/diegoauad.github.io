import { configureStore } from '@reduxjs/toolkit';
import languageReducer from '../redux/language';
import terminalReducer from '../redux/terminal';

export const store = configureStore({
  reducer: {
    language: languageReducer,
    terminal: terminalReducer
  },
});
