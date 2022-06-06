import { useState, useEffect, FC } from 'react'
import { useAppSelector, useAppDispatch } from '../../../../../redux/hook'
import { purchased } from '../../../../../redux/retailersSlice'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import { SiAddthis } from 'react-icons/si';
import { AiFillDelete } from 'react-icons/ai';

import './PurchaseComponent.scss'

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

interface PurchaseComponentProps {
  retailer: Retailer,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
  cart: {
    name: string,
    quantity: number
  }[]
}

const PurchaseComponent: FC<PurchaseComponentProps> = ({ retailer, setShowOverlay }) => {
  const dispatch = useAppDispatch();

  const wholesalerProducts = useAppSelector((state) => state.wholesaler.products)

  const [products, setProducts] = useState(wholesalerProducts.map((product) => {
    return { ...product, available: true}
  }))

  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      cart: [{name: '', quantity: 0}]
    }
  })
  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control
  })

  const tempFormValues = useWatch({name: 'cart', control})

  const [formValues, setFormValues] = useState(tempFormValues)

  useEffect(() => {
    setFormValues(tempFormValues.map((data) => isNaN(data.quantity) ? { ...data, quantity: 0 } : { ...data }))
  }, [tempFormValues])
  
  const updateTempProducts = () => {
    formValues.forEach((cartProduct) => {
      setProducts((oldTempProducts) => {
        return oldTempProducts.map((stockProduct) => {
          if(stockProduct.name === cartProduct.name) {
            if(stockProduct.stock - cartProduct.quantity < 0) {
              return { ...stockProduct, available: false }
            }
            return { ...stockProduct, stock: stockProduct.stock - cartProduct.quantity }
          }
          else
            return { ...stockProduct }
        })
      })
    })
  }

  useEffect(() => {
    setProducts(wholesalerProducts.map((product) => {
      return { ...product, available: true}
    }))
    updateTempProducts()
  }, [wholesalerProducts, formValues])

  const getIndex = (name: string): number => {
    const index = products.findIndex((product) => product.name === name)
    return index
  }

  const getStock = (index: number): number | null => {
    if(formValues[index]?.name && formValues[index].name !== '')
      return wholesalerProducts[getIndex(formValues[index].name)].stock
    return null
  }

  const checkAvailability = (index: number): string | null => {
    if(formValues[index]?.name && formValues[index]?.quantity) {
      if(formValues[index].name !== '' && formValues[index].quantity !== 0) {
        if(products[getIndex(formValues[index].name)]?.available === false) {
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
        if(products[getIndex(formValues[index].name)]?.available === true && formValues[index].quantity !== 0) 
          return String(products[getIndex(formValues[index].name)].price * formValues[index].quantity)
      }
    }
    return '-'
  }

  const onSubmit = (data: Inputs) => {
    data.cart.forEach((product) => {
      dispatch(purchased({id: retailer.id, name: product.name, quantity: product.quantity}))
    })
    setShowOverlay(false)
  }

  return (
    <>
      <div className='purchase-header'>
        <span>Enter What You Want To Supply</span>
        <button onClick={() => append({name: '', quantity: 0})}><SiAddthis /></button>
      </div>
      
      <form onSubmit={handleSubmit(onSubmit)} className='purchase-form'>
        {fields.map((field, index) => (
          <div key={field.id} className='single-purchase-form'>
            <div>
              <span>Product</span>
              <select
              {...register(`cart.${index}.name` as const, {required: true})}
              className={errors?.cart?.[index]?.name ? "error" : ""}
              >
              {products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
            </select>
            </div>
           
            <div>
              <span>Quantity</span>
              <input
                defaultValue={0} type="number" placeholder='quantity'
                {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true})}
                className={errors?.cart?.[index]?.quantity ? "error" : ""}
                min={1}
                {...(getStock(index) !== null && {max: `${getStock(index)}`})}
              />
            </div>

            <div>
              <span>Price</span>
              <span className='price'>{getPrice(index) !== null && getPrice(index)}</span>
            </div>

            <div>
              <span>Total</span>
              <span className='price'>{calculatePrice(index) !== null && calculatePrice(index)}</span>
            </div>

            {checkAvailability(index) !== null && <span>{checkAvailability(index)}</span>}

            <button type='button' onClick={() => remove(index)}><AiFillDelete /></button>
          </div>
        ))}

        <div>
          <button onClick={() => setShowOverlay(false)}>Cancel</button>
          <button type="submit">Supply</button>
        </div>
      </form>
    </>
  )
}

export default PurchaseComponent