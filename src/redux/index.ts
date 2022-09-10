import { configureStore, combineReducers } from "@reduxjs/toolkit";
import noteReducer from "./reducers/note";

const rootReducer = combineReducers({
    note: noteReducer
})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;