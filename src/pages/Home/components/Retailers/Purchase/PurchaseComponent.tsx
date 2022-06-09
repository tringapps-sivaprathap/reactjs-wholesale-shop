import { useState, useEffect, FC } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../redux/hook'
import { purchased } from '../../../../../redux/retailersSlice'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { Retailer, Inputs } from '../../../../../interfaces/interfaces'
import { SiAddthis } from 'react-icons/si';
import { AiFillDelete } from 'react-icons/ai';
import './PurchaseComponent.scss'

interface PurchaseComponentProps {
  retailer: Retailer,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const PurchaseComponent: FC<PurchaseComponentProps> = ({ retailer, setShowOverlay }) => {
  // formValues - holds field array values
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: { cart: [{name: '', quantity: 0}] }
  })
  const { fields, append, remove } = useFieldArray({name: 'cart', control})

  const formValues = useWatch({name: 'cart', control})

  // products - holds products values
  const products = useAppSelector((state) => state.wholesaler.products)
  console.log(products)
  console.log(formValues)

  // showAdd - show add button
  const [showAdd, setShowAdd] = useState(false)
  useEffect(() => {
    const stockAvailable = products.some((product) => product.stock > 0)
    const valueEntered = formValues.every((product) => product.name !== '')
    setShowAdd(stockAvailable && (valueEntered && (true)))
  }, [products, formValues])

  const getIndex = (name: string): number => {
    const index = products.findIndex((product) => product.name === name)
    return index
  }

  const getMax = (index: number): number | undefined => {
    if(formValues[index]?.name && formValues[index]?.name !== '')
      return products[getIndex(formValues[index].name)]?.stock
    return undefined
  }

  const getPrice = (index: number): string => {
    if(formValues[index]?.name && formValues[index].name !== '')
        return String(products[getIndex(formValues[index].name)].price)
    return '-'
  }

  const calculatePrice = (index: number): string => {
    if(formValues[index]?.name && formValues[index]?.quantity) {
      if(formValues[index].name !== '' && formValues[index].quantity !== 0) {
        if(products[getIndex(formValues[index].name)]?.stock > 0 && formValues[index].quantity !== 0) 
          return String(products[getIndex(formValues[index].name)].price * formValues[index].quantity)
      }
    }
    return '-'
  }

  const checkProducts = (): boolean => {
    return products.some((product) => product.stock > 0)
  }

  const errorMessage = (index: number): string | boolean => {
    if(errors?.cart?.[index]?.name?.type === 'required') {
    return 'Select a product'
    }
    else if(errors?.cart?.[index]?.quantity?.type === 'max') {
      return 'you are reached the max limit'
      }
    else {
      return false
    }
  }

  const dispatch = useAppDispatch()

  const onSubmit = (data: Inputs) => {
    data.cart.forEach((product) => {
      dispatch(purchased({id: retailer.id, name: product.name, quantity: product.quantity}))
    })
    setShowOverlay(false)
  }
  
  return (
    <>
      {checkProducts() ? (<>
        <div className='purchase-header'>
          <span>Enter What You Want To Supply</span>
          {showAdd && <button onClick={() => append({name: '', quantity: 0})}><SiAddthis /></button>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='purchase-form'>
          {fields.map((field, index) => (
            <div key={field.id} className='single-purchase-form'>
              <div className='form-elements'>
                <div>
                  <span>Product</span>
                  <select
                    {...register(`cart.${index}.name` as const, {required: true})}
                    className={errors?.cart?.[index]?.name ? "error" : ""}
                  >
                    {products.map((product) => product.stock > 0 && <option key={product.id} value={product.name}>{product.name}</option>)}
                  </select>
                </div>

                <div className='quantity-container'>
                  <span>Quantity</span>
                  <input
                  defaultValue={0}
                    type="number"
                    placeholder='quantity'
                    {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true, max: getMax(index)})}
                    disabled={formValues[index]?.name === '' ? true : false}
                  />
                </div>

                <div>
                  <span>Price</span>
                  <span className='price'>{getPrice(index)}</span>
                </div>

                <div>
                  <span>Total</span>
                  <span className='price'>{calculatePrice(index)}</span>
                </div>
              </div>
              
              {errorMessage(index) &&
              <div className='error-message'>
                <span>{errorMessage(index)}</span>
              </div>}

              <button type='button' onClick={() => remove(index)}><AiFillDelete /></button>
            </div>
          ))}

          <div>
            <button onClick={() => setShowOverlay(false)}>Cancel</button>
            <button type="submit">Supply</button>
          </div>
        </form>
        {/* {JSON.stringify(formValues)}
        {JSON.stringify(retailer)} */}
      </>) 
      : (
        <div className='no-stock-message'>
          <p>No Product Available!</p>
        </div>
      )}
    </>
  )
}

export default PurchaseComponent