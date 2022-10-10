import { createSlice } from '@reduxjs/toolkit'

export const checkAuthAdmiin = createSlice({
    name: 'counter',
    initialState: {
        checkAdmin : false
    },
    reducers: {
      updateAdmin : (state, value) =>{
        console.log(value.payload)
        state.checkAdmin = value.payload
      } 
    },
  })

export const { updateAdmin } = checkAuthAdmiin.actions

export default checkAuthAdmiin.reducer