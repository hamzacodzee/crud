import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
    name: 'user',
    initialState: {userList:JSON.parse(localStorage.getItem('users')) || [], edit:null},
    reducers: {

        addUsers(state, action) {
            state.userList.push(action.payload)
            localStorage.setItem('users', JSON.stringify(state.userList));
        },

        removeUsers(state, action) {
            state.userList.splice(action.payload, 1)
            localStorage.setItem('users', JSON.stringify(state.userList));
        },

        editUsers(state, action) {
            state.userList[action.payload.id] = action.payload.values;
            localStorage.setItem('users', JSON.stringify(state.userList));
            localStorage.removeItem('update');
        },

        deleteAllUsers(state, action) {
            localStorage.removeItem('users');
            return []
        },

        whichToEdit(state, action) {
            
            state.edit = {id:action.payload.id, user:action.payload.user}
        },

    },
})


export const { addUsers, removeUsers, deleteAllUsers, editUsers, whichToEdit } = userSlice.actions
export const usersList = (state) => state.user.userList;
export const editUserData = (state) => state.user.edit;


export default userSlice.reducer