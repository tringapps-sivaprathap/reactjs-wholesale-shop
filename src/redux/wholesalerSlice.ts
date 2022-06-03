import { createSlice } from '@reduxjs/toolkit'
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
  reducers: {
  }
  
})

export default wholesalerSlice.reducer
export const {} = wholesalerSlice.actions