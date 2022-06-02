import { configureStore } from '@reduxjs/toolkit'
import wholesalerReducer from './wholesalerSlice'
import retailersReducer from './retailersSlice'

const store = configureStore({
  reducer: {
    wholesaler: wholesalerReducer,
    retailers: retailersReducer
  }
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch