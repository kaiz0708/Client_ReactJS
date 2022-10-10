import { createSlice } from '@reduxjs/toolkit'

export const updateUserSlice = createSlice({
    name: 'counter',
    initialState: {
        username : undefined,
        avatar : ' ',
    },
    reducers: {
      update : (state , value) => {
        state.username = value.payload.username
        state.avatar = value.payload.avatar
      },

      updateAvatar : (state, value) => {
        state.avatar = value.payload
      }
    },
  })

export const { update , updateAvatar } = updateUserSlice.actions
  
export default updateUserSlice.reducer