import { createSlice } from '@reduxjs/toolkit'

export const updateListPay = createSlice({
    name: 'counter',
    initialState: {
        listBill :[]
    },
    reducers: {
      updatelistBillAdmin : (state, value) => {
        state.listBill = [...value.payload]
      },

      removeBillList : (state, value) => {
        let new_array = state.listBill.filter((ele)=> ele.id_bill !== value.payload)
        state.listBill = [...new_array]
      },
    },
  })

export const { removeBillList , updatelistBillAdmin } = updateListPay.actions

export default updateListPay.reducer