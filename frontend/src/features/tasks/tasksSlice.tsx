import { createSlice } from "@reduxjs/toolkit"

const initialState = [
    {
        language: "es"
    }
]

const userSlice = createSlice({
    name: "lang",
    initialState,
    reducers: {
        changeLanguage: (state, action) => {
            state.push(action.payload)
        }

    }
})

export const { changeLanguage } = userSlice.actions
export default userSlice.reducer