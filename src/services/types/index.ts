import store from "../store"
import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action>