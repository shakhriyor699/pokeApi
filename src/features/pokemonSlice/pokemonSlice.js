import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const loadPokeData = createAsyncThunk(
  '@@poke/PokeData',
  async (limit) => {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=0`)
    const { data } = res
    return data
  }
)




const initialState = {
  loading: true,
  pokeData: [],
  error: null,
  pokeInfo: []
}

const pokemonSlice = createSlice({
  name: '@@poke',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loadPokeData.pending, (state) => {
        state.loading = true
      })
      .addCase(loadPokeData.fulfilled, (state, action) => {
        state.loading = false
        state.pokeData = action.payload
        state.pokeInfo = action.payload.results.map(item => item.url)
      })
      .addCase(loadPokeData.rejected, (state) => {
        state.loading = false
        state.error = 'Some error'
      })

  }
})


export const pokemonReducer = pokemonSlice.reducer