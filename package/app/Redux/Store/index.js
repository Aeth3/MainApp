import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import reducer from "../reducer";

//import logger from 'redux-logger'

const Store =  configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})

export default Store;