import { createSlice } from '@reduxjs/toolkit'

export const updateUserAdmin = createSlice({
    name: 'counter',
    initialState: {
        listUser :[]
    },
    reducers: {
      updateUserList : (state, value) => {
        state.listUser = [...value.payload]
      },

      removeUserList : (state, value) => {
        let new_array = state.listUser.filter((ele)=> ele.id_user !== value.payload.id_user)
        state.listUser = [...new_array]
      },
    },
  })

export const { removeUserList , updateUserList  } = updateUserAdmin.actions

export default updateUserAdmin.reducer