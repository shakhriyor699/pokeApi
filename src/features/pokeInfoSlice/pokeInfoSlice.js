import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loadAbout = createAsyncThunk(
  '@@about/load',
  async (urls, { dispatch }) => {
    let arr = []
    for (const item of urls) {
      const res = await axios.get(item)
      const { data } = res
      arr.push(data)
    }
    dispatch(add(arr))
  }
)

const initialState = {
  aboutPoke: []
}

const pokeAboutSlice = createSlice({
  name: '@@about',
  initialState,
  reducers: {
    add: (state, action) => {
      state.aboutPoke = action.payload
    }
  }
})

export const pokeAboutReducer = pokeAboutSlice.reducer

const { add } = pokeAboutSlice.actions