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

  const tempFormValues = useWatch({name: 'cart', control})
  const [formValues, setFormValues] = useState(tempFormValues)

  useEffect(() => {
    setFormValues(tempFormValues.map((data) => isNaN(data.quantity) ? { ...data, quantity: 0 } : { ...data }))
  }, [tempFormValues])

  // products - holds products values
  const wholesalerProducts = useAppSelector((state) => state.wholesaler.products)
  const [products, setProducts] = useState(wholesalerProducts)

  const updateProducts = () => {
    formValues.forEach((cartProduct) => {
      setProducts((oldProducts) => {
        return oldProducts.map((stockProduct) => {
          if(stockProduct.name === cartProduct.name) {
            if(stockProduct.stock - cartProduct.quantity <= 0) return { ...stockProduct, stock: 0 }
            else return { ...stockProduct, stock: stockProduct.stock - cartProduct.quantity }
          }
          else return { ...stockProduct }
        })
      })
    })
  }

  useEffect(() => {
    setProducts(wholesalerProducts)
    updateProducts()
  }, [products, formValues])

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

  const getMax = (index: number): number | null => {
    if(formValues[index]?.name && formValues[index].name !== '')
      return wholesalerProducts[getIndex(formValues[index].name)].stock
    return null
  }

  const getStock = (index: number): string => {
    if(formValues[index]?.name && formValues[index].name !== '')
      return String(products[getIndex(formValues[index].name)].stock)
    return '-'
  }

  const checkAvailability = (index: number): string | null => {
    if(formValues[index]?.name && formValues[index]?.quantity) {
      if(formValues[index].name !== '' && formValues[index].quantity !== 0) {
        if(products[getIndex(formValues[index].name)]?.stock === 0) {
          return 'exceeding stock quantity'
        }
      }
    }
    return null
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
    return wholesalerProducts.some((product) => product.stock > 0)
  }

  const getErrorMessage = (index: number): string | null => {
    console.log(errors?.cart?.[index]?.quantity?.type)
    if(errors?.cart?.[index]?.name?.type === 'required') {
    return 'Select a product'
    }
    else if(errors?.cart?.[index]?.quantity) {
      return String(errors?.cart?.[index]?.quantity?.type)
      }
    else {
      return null
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
                    {wholesalerProducts.map((product) => product.stock > 0 && <option key={product.id} value={product.name}>{product.name}</option>)}
                  </select>
                </div>

                <div>
                  <span>Stock</span>
                  <span className='price'>{getStock(index)}</span>
                </div>

                <div className='quantity-container'>
                  <span>Quantity</span>
                <input
                  defaultValue={0} type="number" placeholder='quantity'
                  {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true})}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                  min={1}
                  {...(getMax(index) !== null && {max: `${getMax(index)}`})}
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

              <div className='error-message'>
                {/* {checkAvailability(index) !== null && <span>{checkAvailability(index)}</span>} */}
                {/* {errors?.cart?.[index]?.name && formValues[index].name === '' && <span>enter a name</span>} */}
                {/* <span>{getErrorMessage(index) !== null && getErrorMessage(index)}</span> */}
              </div>

              <button type='button' onClick={() => remove(index)}><AiFillDelete /></button>
            </div>
          ))}

          <div>
            <button onClick={() => setShowOverlay(false)}>Cancel</button>
            <button type="submit">Supply</button>
          </div>
        </form>
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