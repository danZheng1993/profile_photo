import { configureStore, combineReducers, AnyAction, getDefaultMiddleware } from '@reduxjs/toolkit';

import { reducers } from './slices';

const appReducer = combineReducers(reducers);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const rootReducer = (state: any, action: AnyAction) => {
    return appReducer(state, action);
};

const store = configureStore({
    reducer: rootReducer,
    middleware: [...getDefaultMiddleware({ immutableCheck: false, serializableCheck: false })],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof rootReducer>;

export default store;
