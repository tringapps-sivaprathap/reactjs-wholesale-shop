import { Retailer } from '../../../../../interfaces/RetailerInterface'
import './RetailerComponent.scss'

type RetailerProps = {
  retailer: Retailer
}

const RetailerComponent = ( { retailer }: RetailerProps) => {
  const { name, address, products } = retailer

  return (
    <div className="retailer-container">
      <div className='retailer-header'>
        <p><span>Name:</span> {name}</p>
        <p><span>Adress:</span> {address}</p>
      </div>

      <div className='retailer-content'>
        {products.map((product) => (
          <div key={product.name}>
            <p>Product: {product.name}</p>
            <p>Quantity: {product.stock} kg</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RetailerComponent
