import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    email: '',
    firstName: '',
    image: '',
    lastName: '',
    _id: '',
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginRedux: (state, action) => {
            const userData = action.payload || {};
            state.email = userData.email || '';
            state.firstName = userData.firstName || '';
            state.image = userData.image || '';
            state.lastName = userData.lastName || '';
            state._id = userData._id || '';
        },
        logoutRedux: (state) => {
            state.email = '';
            state.firstName = '';
            state.image = '';
            state.lastName = '';
            state._id = '';
        }
    }
});

export const { loginRedux, logoutRedux } = userSlice.actions;

export default userSlice.reducer;
