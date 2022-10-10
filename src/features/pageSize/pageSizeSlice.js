import { createSlice } from '@reduxjs/toolkit'

export const PageSizeSlice = createSlice({
    name: 'Pagesize',
    initialState: {
        listPage : []
    },
    reducers: {
      updatePageSize : (state , value) => {
        state.listPage = [...value.payload]
      },
    },
  })

export const { updatePageSize } = PageSizeSlice.actions
  
export default PageSizeSlice.reducer