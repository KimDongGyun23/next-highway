import { combineReducers, configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import infoReducer from './slice/infoSlice';

const rootReducer = combineReducers({
  auth: authReducer,
  info: infoReducer
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
        serializableCheck: false
    })
});

export default store;