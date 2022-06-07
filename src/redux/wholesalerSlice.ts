import { createSlice } from '@reduxjs/toolkit'
import { purchased } from './retailersSlice'
import { v4 as uuidv4 } from 'uuid'

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
  name: 'DC Mart',
  products: [
    {
      id: uuidv4(),
      name: 'Rice',
      stock: 200,
      price: 35
    },
    {
      id: uuidv4(),
      name: 'Tomato',
      stock: 250,
      price: 25
    },
    {
      id: uuidv4(),
      name: 'Carrot',
      stock: 150,
      price: 45
    }
  ]
}

const wholesalerSlice = createSlice({
  name: 'wholesaler',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(purchased, (state, action) => {
      const index = state.products.findIndex((product) => product.name === action.payload.name)

      state.products[index].stock -= action.payload.quantity 
    })
  }
})

export default wholesalerSlice.reducer
// export const {} = wholesalerSlice.actions