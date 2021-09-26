import { createSlice } from '@reduxjs/toolkit';
const config = require('../../config/terminal.json');

// Slice controlling the selected language in the application

const initialState = {
  path: config.path,
  input: config.input,
  busy: false,
  branch: undefined
};

export const terminalSlice = createSlice({
  name: 'terminal',
  initialState,
  reducers: {
    setInput: (state, payload) => {
      state.input = payload.payload
    },
    setPath: (state, payload) => {
      state.path = payload.payload
    },
    setBranch: (state, payload) => {
      state.branch = payload.payload
    },
  }
});

export const { setInput, setPath, setBranch } = terminalSlice.actions;

export const getInput = (state) => state.terminal.input
export const getPath = (state) => state.terminal.path
export const getBranch = (state) => state.terminal.branch

export const typeInCommand = newText => (dispatch, getState) => {
  var currentText = getState().terminal.input;
  var currentLength = currentText.length;
  var steps = [];
  const delay = 50;

  if(newText !== currentText) {
    while(currentLength > 0 && currentText !== newText.substring(0, currentLength)) {
      currentText = currentText.substring(0, currentLength - 1);
      steps.push(currentText);
      currentLength = currentText.length;
    }
  
    while(currentText !== newText) {
      currentLength += 1;
      currentText = newText.substring(0, currentLength);
      steps.push(currentText);
    }
  }

  for(var i = 0; i < steps.length; i++) setTimeout(dispatch, delay * i, setInput(steps[i]));

  return(steps.length * delay);
};

export default terminalSlice.reducer;
