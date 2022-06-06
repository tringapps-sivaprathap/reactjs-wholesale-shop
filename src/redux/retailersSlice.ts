import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

type InitialState = {
  retailers: {
    id: string,
    c_user: boolean,
    name: string,
    address: string,
    products: {
      name: string,
      stock: number
    }[]
  }[]
}

const initialState: InitialState = {
  retailers: [
    {
      id: uuidv4(),
      c_user: false,
      name: 'Henry Shop',
      address: ' 323, Leroy Lane,  Harold',
      products: []
    },
    {
      id: uuidv4(),
      c_user: false,
      name: 'Bruce Shop',
      address: '4628, Lyndon Street, Northampton',
      products: []
    },
    {
      id: uuidv4(),
      c_user: false,
      name: 'Diana Shop',
      address: '2540, Valley Street, Berlin',
      products: []
    }
  ]
}

const retailersSlice = createSlice({
  name: 'retailers',
  initialState,
  reducers: {
    purchased: (state, action) => { // payload -> id, name, quantity
      const retailerIndex = state.retailers.findIndex((retailer) => retailer.id === action.payload.id)
      const productIndex = state.retailers[retailerIndex].products.findIndex((product) => {
        return product.name == action.payload.name
      })

      if(productIndex === -1) {
        state.retailers[retailerIndex].products.push({ name: action.payload.name, stock: action.payload.quantity})
      }
      else {
        state.retailers[retailerIndex].products[productIndex].stock += action.payload.quantity
      }

      // state.retailers[index].products = state.retailers[index].products.map((product) => {
      //   if(product.name === action.payload.name)
      //     return { ...product, stock: product.stock += action.payload.quantity }
      //   else
      //     return { ...product }
      // })
    }
  }
})

export default retailersSlice.reducer
export const {purchased} = retailersSlice.actions