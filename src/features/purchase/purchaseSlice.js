import { createSlice } from '@reduxjs/toolkit'

export const PurchaseSlice = createSlice({
    name: 'Pagesize',
    initialState: {
        listBill : []
    },
    reducers: {
      updateBill : (state , value) => {
        state.listBill = [...value.payload]
      },

      removeBill : (state, value) => {
        let new_bill = state.listBill.filter(bill => bill.id_bill !== value.payload)
        state.listBill = [...new_bill]
      }
    },
  })

export const { updateBill , removeBill} = PurchaseSlice.actions
  
export default PurchaseSlice.reducer