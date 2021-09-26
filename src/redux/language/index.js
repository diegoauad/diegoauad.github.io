import { createSlice } from '@reduxjs/toolkit';
const config = require('../../config/i18n.json');

// Slice controlling the selected language in the application

const initialState = {
  value: config.default_to,
  switching: false
};

export const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLang: (state, payload) => {
      const lang = payload.payload.split('-')[0].toLowerCase()
      if(config.available_in.includes(lang)) {
        state.value = lang;
      } else {
        console.log(`Unable to set language to "${lang}"`);
      }
    }
  }
});

export const { setLang } = languageSlice.actions;

export const getLang = (state) => state.language.value

export default languageSlice.reducer;
