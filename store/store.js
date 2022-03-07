import { configureStore } from "@reduxjs/toolkit"
import counterSlice from "./counterSlice"
import calculatorReducer from './calculator/calculatorReducer'
import todoReducer from './todo/todoReducer'
import addToCartReducer from './addToCart/addToCartReducer'

export default configureStore({
 reducer: {
  counter: counterSlice,
  todo: todoReducer,
  calculator: calculatorReducer,
  addToCart: addToCartReducer
 }
})