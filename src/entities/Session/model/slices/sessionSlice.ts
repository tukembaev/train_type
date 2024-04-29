import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { TypingSelection } from 'features/TypingSession';
import { SessionGraph, SessionInfo, SessionSchema } from '../types/sessionSchema';

const initialState: SessionSchema = {
  session_results: {
    id:0,
    wpm:0,
    acc:0,
    raw:0,
    consistency:0,
    time_spend:0,
    correct:0,
    incorrect:0,
    mode:TypingSelection.WORDS,
    duration:10,
    language:'russian',
    graphData:[],
    sessionDate:'',

},
  session_info:{
        time_s:0,
        words_count:0,
        letters_count:0,

       
    },
    test_type:{
        mode:TypingSelection.TIME,
        duration:10,
        language:'russian',
    },
    graphData: [],
}

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSessionResults: (state, action: PayloadAction<SessionSchema['session_results']>) => {
      state.session_results = { ...action.payload };
    },
    setGraphData: (state, action:PayloadAction<SessionGraph>) => {
      state.graphData.push(action.payload)
    },
    setViewGraph: (state, action) => { 
      state.graphData = [...action.payload];
    },
    clearGraphData: (state) => {
      state.graphData = []; // Очищаем массив графиков
    },
    setSessionInfo: (state, action: PayloadAction<SessionInfo>) => {
      state.session_info = { ...action.payload };
    },
    
  },
  selectors: {
    getGraphData: (state) => state.graphData,
    getSessionResults: (state) => state.session_results,
    getSessionsInfo: (state) => state.session_info,

  },
})


export const { setGraphData , setViewGraph,setSessionInfo ,setSessionResults , clearGraphData} = sessionSlice.actions
export const {getGraphData , getSessionResults,
  getSessionsInfo} = sessionSlice.selectors

export default sessionSlice.reducer
