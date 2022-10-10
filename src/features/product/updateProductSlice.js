import { createSlice } from '@reduxjs/toolkit'

export const updateProductSlice = createSlice({
    name: 'counter',
    initialState: {
        listProduct :[]
    },
    reducers: {
      updateProduct : (state , value) => {
        let new_product = value.payload
        state.listProduct = new_product
      },

      removeProduct : (state, value) => {
        let new_product = state.listProduct.filter(product => product.id_product !== value.payload)
        state.listBill = [...new_product]
      }
    },
  })

export const { updateProduct , removeProduct } = updateProductSlice.actions

export default updateProductSlice.reducer