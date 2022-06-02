import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'

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
    retailer1: Retailer,
    retailer2: Retailer,
    retailer3: Retailer
  }
}

const initialState: InitialState = {

}

const retailersSlice = createSlice({
  name: 'retailers',
  initialState,
  reducers: {

  }
})

export default retailersSlice.reducer
export const {} = retailersSlice.actions