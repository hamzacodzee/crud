import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/UserSlice'

export default configureStore({
  reducer: {
    user: userReducer,
  },
})