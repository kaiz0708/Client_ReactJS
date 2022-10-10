import { createSlice } from '@reduxjs/toolkit'

export const updateCartSlice = createSlice({
    name: 'counter',
    initialState: {
        listCart :[]
    },
    reducers: {
      updateCart : (state , value) => {
        state.listCart = [...value.payload]
      },

      addCart : (state, value) => {
        state.listCart.push(value.payload)
      },

      reloadCartLogOut : (state, value) => {
        state.listCart = value.payload
      }
    },
  })

export const { updateCart , addCart, reloadCartLogOut } = updateCartSlice.actions

export default updateCartSlice.reducer