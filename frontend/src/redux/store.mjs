import { configureStore } from '@reduxjs/toolkit'
import sidebarAdminSlice from './sidebarAdminSlice.mjs'

export default configureStore({
  reducer: {
    sidebarAdmin: sidebarAdminSlice
  }
})