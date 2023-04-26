import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import recordReducer from '../features/records/recordSlice';
import logger from 'redux-logger';

export const store = configureStore({
  reducer: {
    record: recordReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
