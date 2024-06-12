import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  collapsed: true
}

export const sidebarAdminSlice = createSlice({
  name: 'sidebarAdmin',
  initialState,
  reducers: {
    toggle: state => {
      state.collapsed = ! state.collapsed;
    },
    show: state => {
      state.collapsed = false;
    },
    hide: state => {
        state.collapsed = true;
    }
  }
})

// Action creators are generated for each case reducer function
export const { toggle, show, hide } = sidebarAdminSlice.actions

export default sidebarAdminSlice.reducer