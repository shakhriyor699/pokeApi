import { configureStore } from '@reduxjs/toolkit'
import { pokemonReducer } from '../features/pokemonSlice/pokemonSlice'
import { pokeAboutReducer } from '../features/pokeInfoSlice/pokeInfoSlice'


const store = configureStore({
  reducer: {
    pokemon: pokemonReducer,
    poke: pokeAboutReducer
  },
  devTools: true,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export default store