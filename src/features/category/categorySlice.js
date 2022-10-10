import { createSlice } from '@reduxjs/toolkit'

export const CategorySlice = createSlice({
    name: 'counter',
    initialState: {
        listCategory : []
    },
    reducers: {
      updateCategory : (state , value) => {
        console.log(value)
        state.listCategory = [...value.payload]
      },
    },
  })

export const { updateCategory } = CategorySlice.actions
  
export default CategorySlice.reducer