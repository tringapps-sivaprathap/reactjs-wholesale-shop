import { FC, useState, useEffect } from "react"
import { Product as WholesaleProduct } from '../../../../../interfaces/WholesalerInterface'
import { Product as InputProduct } from '../../../../../interfaces/FieldArrayInterface'

interface SelectProuctComponentProps {
  wholesaleProducts: WholesaleProduct[];
  formValues: InputProduct[];
  index: number;
}

const SelectProuctComponent:FC<SelectProuctComponentProps> = ({ wholesaleProducts, formValues, index }) => {
  const [products, setProducts] = useState<WholesaleProduct[]>([])

  useEffect(() => {
    setProducts(wholesaleProducts.filter((stockProduct) =>
      formValues.every((cartProduct) => cartProduct.name !== stockProduct.name) ||
      (formValues[index]?.name && formValues[index].name === stockProduct.name)
    ))
  }, [formValues])

  return (
    <>
      {products.map((product) => product.stock > 0 &&
      <option key={product.id} value={product.name}>{product.name}</option>)}
    </>
  )
}

export default SelectProuctComponent