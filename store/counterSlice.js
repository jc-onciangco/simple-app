import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'

export const fetchPokemon = createAsyncThunk(
    'pokemon/fetchPokemonStatus',
    async id => {
      const response = await fetch(` https://pokeapi.co/api/v2/pokemon/${id}`)
      return response.json()
    }
  )

export const counterSlice = createSlice({
    name: 'counter',
    initialState: {
        count: 0,
        pokemons: [],
        loading: false
    },
    reducers: {
        increment: state => {
            state.count += 1
        },
        decrement: state => {
            state.count -= 1
        },
        incrementByAmount: (state, action) => {
            state.count += action.payload
        }
    },
    extraReducers: {
        [fetchPokemon.fulfilled]: (state, action) => {
            // Add user to the state array
            // state.loading = false
            // state.pokemons = [...action.payload.results]
            console.log(action)
        },
        [fetchPokemon.pending]: (state, action) => {
            // Add user to the state array
            // state.loading = true
            console.log(action)
        },
        [fetchPokemon.rejected]: (state, action) => {
            // Add user to the state array
            console.log(action)
        }
    }
})

export const {
    increment,
    decrement,
    incrementByAmount
} = counterSlice.actions

export default counterSlice.reducer