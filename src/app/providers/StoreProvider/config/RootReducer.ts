import { authAPI } from 'features/Authorization';
import { typingAPI } from 'features/TypingSession';
import { sessionSlice } from 'entities/Session/model/slices/sessionSlice'; 
import { userAPI } from 'entities/User';

import { typingSlice } from 'features/TypingSession/model/slices/typingSlice';
import { leaderBoardAPI } from 'entities/LeaderBoard/model/services/leaderBoardAPI';

import { combineReducers } from 'redux';

export const rootReducer = combineReducers({
  typing: typingSlice.reducer,
  session: sessionSlice.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [typingAPI.reducerPath]: typingAPI.reducer,
  [leaderBoardAPI.reducerPath]: leaderBoardAPI.reducer,

  
});

export type RootState = ReturnType<typeof rootReducer>;
