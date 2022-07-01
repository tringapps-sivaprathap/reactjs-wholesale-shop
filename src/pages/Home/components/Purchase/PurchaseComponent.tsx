import { useState, useEffect, FC } from 'react';
import { useAppSelector, useAppDispatch } from '../../../../redux/hook';
import { purchased } from '../../../../redux/retailersSlice';
import { useForm, useFieldArray, useWatch } from 'react-hook-form';
import { Retailer } from '../../../../interfaces/RetailerInterface';
import { Inputs } from '../../../../interfaces/FieldArrayInterface';
import { SiAddthis } from 'react-icons/si';
import { AiFillDelete } from 'react-icons/ai';
import SelectProuctComponent from './SelectProduct/SelectProuctComponent';
import './PurchaseComponent.scss';

interface PurchaseComponentProps {
  retailer: Retailer,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const PurchaseComponent: FC<PurchaseComponentProps> = ({ retailer, setShowOverlay }) => {
  // formValues - holds field array values
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: { cart: [{name: ''}] }
  })
  const { fields, append, remove } = useFieldArray({name: 'cart', control})

  const formValues = useWatch({name: 'cart', control})

  // products - holds products values
  const products = useAppSelector((state) => state.wholesaler.products)

  // showAdd - show add button
  const [showAdd, setShowAdd] = useState(false)

  useEffect(() => {
    const stockAvailable = products.some((product) => product.stock > 0)
    const productsSelected = formValues.every((product) => product.name !== '')
    const productsAvailable = products.some((stockProduct) => formValues.every((cartProduct) => cartProduct.name !== stockProduct.name))
    
    if (productsAvailable && stockAvailable && productsSelected) setShowAdd(true)
    else setShowAdd(false)
  }, [products, formValues])

  const getIndex = (name: string): number => {
    return products.findIndex((product) => product.name === name)
  }

  const getMax = (index: number): number | undefined => {
    if (formValues[index]?.name && formValues[index]?.name !== '')
      return products[getIndex(formValues[index].name)]?.stock
    return undefined
  }

  const getPrice = (index: number): React.ReactNode => {
    if (formValues[index]?.name && formValues[index].name !== '')
      return <span>{products[getIndex(formValues[index].name)]?.price} &#8377;</span>
    else
      return <span>-</span>
  }

  const calculatePrice = (index: number): React.ReactNode => {
    if (formValues[index]?.name && formValues[index]?.quantity) {
      if (formValues[index].name !== '' && formValues[index].quantity !== 0) {
        if (products[getIndex(formValues[index].name)]?.stock > 0 && formValues[index].quantity !== 0) 
          return <span>{products[getIndex(formValues[index].name)].price * formValues[index].quantity} &#8377;</span>
      }
    }
    return <span>-</span>
  }

  const checkProducts = (): boolean => {
    return products.some((product) => product.stock > 0)
  }

  const errorMessage = (index: number): string | boolean => {
    if (errors?.cart?.[index]?.name?.type === 'required')
      return 'Select a product!'
    else if (errors?.cart?.[index]?.quantity?.type === 'required')
      return 'Quantity is required!'
    else if (errors?.cart?.[index]?.quantity?.type === 'min')
      return 'Enter atleast 1kg!'
    else if (errors?.cart?.[index]?.quantity?.type === 'max')
      return "Don't have this much of stock!"
    else
      return false
  }

  const dispatch = useAppDispatch();

  const onSubmit = (data: Inputs) => {
    data.cart.forEach((product) => {
      let productUnit = products.find((wholesaleProduct) => wholesaleProduct.name === product.name)?.unit;
      dispatch(purchased({id: retailer.id, name: product.name, quantity: product.quantity, unit: productUnit}));
    })
    setShowOverlay(false)
  }
  
  return (
    <>
      {checkProducts() ? (<>
        <div className='purchase-header'>
          <span>Enter What You Want To Supply</span>
          {showAdd && <button onClick={() => append({name: ''})}><SiAddthis /></button>}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className='purchase-form'>
          <div className='single-purchase-container'>
          {fields.map((field, index) => (
            <div key={field.id} className='single-purchase-form'>
              <div className='form-elements'>
                <div>
                  <span>Product</span>
                  <select
                    {...register(`cart.${index}.name` as const, {required: true})}
                  >
                    <option disabled hidden value=''></option>
                    <SelectProuctComponent wholesaleProducts={products} formValues={formValues} index={index}/>
                  </select>
                </div>

                <div className='quantity-container'>
                  <span>Quantity</span>
                  <input
                    type="number"
                    placeholder='quantity'
                    {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true, min: 1, max: getMax(index)})}
                    disabled={formValues[index]?.name === '' ? true : false}
                  />
                </div>

                <div className='price'>
                  <span>Price</span>
                  {getPrice(index)}
                </div>

                <div className='price'>
                  <span>Total</span>
                  {calculatePrice(index)}
                </div>
              </div>
              
              {errorMessage(index) &&
              <div className='error-message'>
                <span>{errorMessage(index)}</span>
              </div>}

              <div className='delete-button'>
                <button type='button' onClick={() => remove(index)}><AiFillDelete /></button>
              </div>
            </div>
          ))}
          </div>

          {formValues.length !== 0 && <div className='supply-cancel'>
            <button onClick={() => setShowOverlay(false)}>Cancel</button>
            <button type="submit">Supply</button>
          </div>}
        </form>
      </>) 
      : (
        <div className='no-stock-message'>
          <p>No Product Available!</p>
        </div>
      )}
    </>
  );
};

export default PurchaseComponent;