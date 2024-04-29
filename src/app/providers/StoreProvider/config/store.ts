import { configureStore } from '@reduxjs/toolkit'
import { userAPI } from 'entities/User'
import { authAPI } from 'features/Authorization';
import { typingAPI } from 'features/TypingSession';

import { leaderBoardAPI } from 'entities/LeaderBoard/model/services/leaderBoardAPI';
import { rootReducer } from './RootReducer'

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(userAPI.middleware)
      .concat(authAPI.middleware)
      .concat(typingAPI.middleware)
      .concat(leaderBoardAPI.middleware)

  },
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch