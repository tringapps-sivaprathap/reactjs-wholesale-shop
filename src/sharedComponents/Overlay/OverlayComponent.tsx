import { useState, useEffect, FC } from 'react'
import { useAppSelector, useAppDispatch } from '../../redux/hook'
import { purchased } from '../../redux/retailersSlice'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import './OverlayComponent.scss'

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

interface OverlayComponentProps {
  retailer: Retailer,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

type Inputs = {
  cart: {
    name: string,
    quantity: number
  }[]
}

const OverlayComponent: FC<OverlayComponentProps> = ({ retailer, setShowOverlay }) => {
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
        if(products[getIndex(formValues[index].name)]?.available === false)
          return 'exceeding stock quantity'
      }
    }
    return null
  }

  const getPrice = (index: number): number | null => {
    if(formValues[index]?.name && formValues[index].name !== '')
      return products[getIndex(formValues[index].name)].price
    return null
  }

  const calculatePrice = (index: number): string | null => {
    if(formValues[index]?.name && formValues[index]?.quantity) {
      if(formValues[index].name !== '' && formValues[index].quantity !== 0) {
        if(products[getIndex(formValues[index].name)]?.available === true && formValues[index].quantity !== 0) 
          return String(products[getIndex(formValues[index].name)].price * formValues[index].quantity)
        else
          return '-'
      }
    }
    return null
  }

  const onSubmit = (data: Inputs) => {
    data.cart.forEach((product) => {
      dispatch(purchased({id: retailer.id, name: product.name, quantity: product.quantity}))
    })
  }

  return (
    <div className="overlay-container">
      <div className='overlay'>
        <form onSubmit={handleSubmit(onSubmit)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <select
                  {...register(`cart.${index}.name` as const, {required: true})}
                  className={errors?.cart?.[index]?.name ? "error" : ""}
                >
                  {products.map((product) => <option key={product.id} value={product.name}>{product.name}</option>)}
                </select>

                <input
                  defaultValue={0} type="number" placeholder='quantity'
                  {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true})}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                  min={1}
                  {...(getStock(index) !== null && {max: `${getStock(index)}`})}
                />

                <span>{checkAvailability(index) !== null && checkAvailability(index)}</span>

                <span>{getPrice(index) !== null && getPrice(index)}</span>

                <span>{calculatePrice(index) !== null && calculatePrice(index)}</span>

                <button type='button' onClick={() => remove(index)}>Delete</button>
              </div>
            )
          })}

          <button type='button' onClick={() => append({name: '', quantity: 0})}>Append</button>

          <input type="submit" />
        </form>

        <button onClick={() => setShowOverlay(false)}>Cancel</button>

        {JSON.stringify(products)}
        {JSON.stringify(formValues)}
      </div>
    </div>
  )
}

export default OverlayComponent