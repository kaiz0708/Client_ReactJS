import { createSlice } from '@reduxjs/toolkit'

export const updateListPay = createSlice({
    name: 'counter',
    initialState: {
        listPay :[],
        listCost : {}
    },
    reducers: {
      addProductList : (state , value) => {
        state.listPay.push(value.payload)
      },

      removeProductList : (state, value) => {
        let new_array = state.listPay.filter((ele)=> ele.id_cart !== value.payload.id_cart)
        state.listPay = [...new_array]
      },

      updateList : (state, value) => {
        state.listPay = value.payload                                                                                                                               
      }
    },
  })

export const { addProductList, removeProductList, updateList } = updateListPay.actions

export default updateListPay.reducer