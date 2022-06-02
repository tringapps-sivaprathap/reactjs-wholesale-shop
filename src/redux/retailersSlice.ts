import { createSlice } from '@reduxjs/toolkit'

type Retailer = {
  id: string,
  c_user: boolean,
  name: string,
  address: string,
  products: {
    name: string,
    stock: number
  }[]
}

type InitialState = {
  retailers: {
    retailer1: Retailer | [],
    retailer2: Retailer | [],
    retailer3: Retailer | []
  }
}

const initialState: InitialState = {
  retailers: {
    retailer1: [],
    retailer2: [],
    retailer3: []
  }
}

const retailersSlice = createSlice({
  name: 'retailers',
  initialState,
  reducers: {

  }
})

export default retailersSlice.reducer
export const {} = retailersSlice.actions