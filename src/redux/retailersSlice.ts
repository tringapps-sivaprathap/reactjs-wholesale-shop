import { createSlice } from '@reduxjs/toolkit'

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
      id: '1',
      c_user: false,
      name: 'kumar',
      address: '34, joseph st., kamarajapuram, madurai - 9',
      products: [
        {
          name: 'rice',
          stock: 5
        }
      ]
    },
    {
      id: '2',
      c_user: false,
      name: 'kamal',
      address: '34, joseph st., kamarajapuram, madurai - 9',
      products: [
        {
          name: 'rice',
          stock: 5
        }
      ]
    },
    {
      id: '3',
      c_user: false,
      name: 'rajini',
      address: '34, joseph st., kamarajapuram, madurai - 9',
      products: [
        {
          name: 'rice',
          stock: 5
        }
      ]
    }
  ]
}

const retailersSlice = createSlice({
  name: 'retailers',
  initialState,
  reducers: {
    purchased: (state, action) => {
      // payload -> id, product, quantity
      const index = state.retailers.findIndex((retailer) => retailer.id === action.payload.id)

      state.retailers[index].products = state.retailers[index].products.map((product) => {
        if(product.name === action.payload.product)
          return { ...product, stock: product.stock += action.payload.quantity }
        else
          return { ...product }
      })
    },
    purchaseCancelled: (state, action) => {

    }
  }
})

export default retailersSlice.reducer
export const {purchased, purchaseCancelled} = retailersSlice.actions