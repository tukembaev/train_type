import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { QuoteType, TimeDuration, TypingSelection, WordsQuantity, sessionData } from '../types/modsSchema';
import { typingLanguageSelection } from '../types/typingSchema';

interface TypingState extends sessionData {
  text:string;
  errors:number;
  reload:boolean;
  language:string;
}
const lastLanguage = localStorage.getItem('last_language')

const initialState: TypingState = {
  text:'',
  errors:0,
  reload:false,
  language: lastLanguage || typingLanguageSelection.RUSSIAN,
  mode: TypingSelection.WORDS,
  duration: 10,
  filters: [],
}

if(initialState.mode === TypingSelection.TIME){ 
  initialState.duration = TimeDuration.TIME15S;
}
if(initialState.mode === TypingSelection.WORDS){ 
  initialState.duration = WordsQuantity.WORDS10;
}
if(initialState.mode === TypingSelection.QUOTE){ 
  initialState.duration = QuoteType.SHORT;
}

export const typingSlice = createSlice({
  name: 'typing',
  initialState,
  reducers: {
    setTextSession: (state, action: PayloadAction<string>) => {
      state.text = action.payload
    },
    deleteUncorrectLetter: (state) => {
        state.text = state.text.slice(0, -1);
    },
    setReload: (state) => {
      state.reload = !state.reload;
  },
  setLanguage: (state ,action) => {
    state.language = action.payload;
},
    setErrorsCount: (state, action: PayloadAction<number>) => {
      state.errors = action.payload
    },
    selectMode: (state, action) => {
      state.mode = action.payload
    },
    selectDuration: (state, action) => {
      state.duration = action.payload
    },
    toggleFilter: (state, action) => {
      const filter = action.payload;
    const index = state?.filters?.indexOf(filter);
    if (index === -1) {
        state.filters = [...(state.filters || []), filter];
    } else if (index !== undefined) {
        state.filters?.splice(index, 1);
    }
    },
  },
  selectors: {
    getText: (state) => state.text,
    getErrors: (state) => state.errors,
    getReload: (state) => state.reload,
    getLanguage: (state) => state.language,
    getMode: (state) => state.mode,
    getDuration: (state) => state.duration,
    getFilter: (state) => state.filters,
  },
})

export const { setTextSession ,deleteUncorrectLetter, setErrorsCount, selectMode , toggleFilter , selectDuration ,setReload ,setLanguage } = typingSlice.actions
export const {getText, getErrors ,getMode, getDuration, getFilter, getReload ,getLanguage } = typingSlice.selectors
export default typingSlice.reducer