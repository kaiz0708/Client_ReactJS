import { createSlice } from '@reduxjs/toolkit'

export const updateFeedBack = createSlice({
    name: 'feedback',
    initialState: {
        listFeedBack : []
    },
    reducers: {
      addFeedBack : (state , value) => {
        state.listFeedBack.push(value.payload)
      },

      removeFeedBack : (state, value) => {
        let new_array = state.listFeedBack.filter((ele)=> ele.id !== value.payload)
        state.listFeedBack = [...new_array]
      },

      updateListFeedBack : (state, value) => {
        state.listFeedBack = value.payload                                                                                                                               
      }
    },
  })

export const { addFeedBack, removeFeedBack, updateListFeedBack } = updateFeedBack.actions

export default updateFeedBack.reducer