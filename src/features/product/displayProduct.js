import { createSlice } from '@reduxjs/toolkit'

export const updateInforProductSlice = createSlice({
    name : 'displayProduct',
    initialState: {
        Infor : {}
    },
    reducers: {
      updateInforProduct : (state , value) => {
        state.Infor = {...value.payload}
      },
    },
  })

export const { updateInforProduct } = updateInforProductSlice.actions

export default updateInforProductSlice.reducer