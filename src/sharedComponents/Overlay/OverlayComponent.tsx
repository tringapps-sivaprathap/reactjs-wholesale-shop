import { useState, useEffect } from 'react'
import { useAppSelector } from '../../redux/hook'
import { useForm, useFieldArray, useWatch } from 'react-hook-form'
import './OverlayComponent.scss'

type OverlayComponentProps = {
  setShowOverlay: (argument: boolean) => void
}

type Inputs = {
  cart: {
    product: string,
    quantity: number
  }[]
}

type FormData = {
  product: string,
  quantity: number
}[]

const OverlayComponent = ({ setShowOverlay }: OverlayComponentProps) => {
  const products = useAppSelector((state) => state.wholesaler.products)
  // const [tempState, setTempState] = useState()
  // const [formData ,setFormData] = useState<FormData>([])
  const { register, control, handleSubmit, formState: { errors } } = useForm<Inputs>({
    defaultValues: {
      cart: [{product: '', quantity: 0}]
    }
  })
  const { fields, append, remove } = useFieldArray({
    name: 'cart',
    control
  })

  const formData = useWatch({name: 'cart', control})
  console.log(formData)
  // useEffect(() => {
  //   setFormData(tempFormData)
  // }, [tempFormData])

  const productPrice = (name: string): number | undefined => {
    const product = products.find((product) => product.name === name)
    return product?.price
  }

  const onsubmit = (data: Inputs) => {
    // setFormData(tempFormData);
    // console.log(formData)
  }

  return (
    <div className="overlay-container">
      <div className='overlay'>
        <form onSubmit={handleSubmit(onsubmit)}>
          {fields.map((field, index) => {
            return (
              <div key={field.id}>
                <select
                  {...register(`cart.${index}.product` as const, {required: true})}
                  className={errors?.cart?.[index]?.product ? "error" : ""}
                >
                  <option value="rice">Rice</option>
                  <option value="tomato">Tomato</option>
                </select>

                <input
                  type="number"
                  placeholder='quantity'
                  {...register(`cart.${index}.quantity` as const, {required: true, valueAsNumber: true})}
                  className={errors?.cart?.[index]?.quantity ? "error" : ""}
                  max={4}
                />

                {/* <span>{formData[index].product}</span> */}
                <span>{formData[index]?.product ? productPrice(formData[index].product) : 0}</span>

                <button
                  type='button'
                  onClick={() => remove(index)}
                >
                  Delete
                </button>
              </div>
            )
          })}

          <button
            type='button'
            onClick={() => append({product: '', quantity: 0})}
          >
            Append
          </button>

          <input type="submit" />
        </form>
        <button onClick={() => setShowOverlay(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default OverlayComponent