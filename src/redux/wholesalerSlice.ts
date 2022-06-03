import { createSlice } from '@reduxjs/toolkit'
import { purchased } from './retailersSlice'
import { v4 as uuidv4 } from 'uuid'
import { stat } from 'fs'

type InitialState = {
  name: string
  products: {
    id: string,
    name: string,
    stock: number,
    price: number
  }[]
}

const initialState: InitialState = {
  name: 'SivaMart',
  products: [
    {
      id: uuidv4(),
      name: 'rice',
      stock: 15,
      price: 35
    },
    {
      id: uuidv4(),
      name: 'tomato',
      stock: 20,
      price: 25
    }
  ]
}

const wholesalerSlice = createSlice({
  name: 'wholesaler',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(purchased, (state, action) => {
      const index = state.products.findIndex((product) => product.name === action.payload.product)

      state.products[index].stock -= action.payload.quantity 
    })
  }
})

export default wholesalerSlice.reducer
export const {} = wholesalerSlice.actions