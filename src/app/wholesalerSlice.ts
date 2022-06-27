import { createSlice } from '@reduxjs/toolkit'
import { purchased } from './retailersSlice'
import { Wholesaler } from '../interfaces/WholesalerInterface'
import { v4 as uuidv4 } from 'uuid'

const initialState: Wholesaler = {
  name: 'DC Mart',
  products: JSON.parse(localStorage.getItem('wholesaler-products') || JSON.stringify([
    {
      id: uuidv4(),
      name: 'Rice',
      stock: 200,
      price: 35,
      unit: 'kg'
    },
    {
      id: uuidv4(),
      name: 'Tomato',
      stock: 250,
      price: 25,
      unit: 'kg'
    },
    {
      id: uuidv4(),
      name: 'Carrot',
      stock: 150,
      price: 45,
      unit: 'kg'
    },
    {
      id: uuidv4(),
      name: 'Milk',
      stock: 50,
      price: 40,
      unit: 'L'
    },
    {
      id: uuidv4(),
      name: 'Juice',
      stock: 300,
      price: 25,
      unit: 'L'
    }
  ]))
}

const wholesalerSlice = createSlice({
  name: 'wholesaler',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(purchased, (state, action) => {
      const index = state.products.findIndex((product) => product.name === action.payload.name)
      state.products[index].stock -= action.payload.quantity 

      localStorage.setItem('wholesaler-products', JSON.stringify(state.products))
    })
  }
})

export default wholesalerSlice.reducer
// export const {} = wholesalerSlice.actions