import { useAppSelector } from '../../../../redux/hook'
import './RetailersComponents.css'

const Retailer1Component = () => {
  const { name, address, products } = useAppSelector((state) => state.retailers.retailers.retailer1)
  return (
    <div className="retailer retailer-1-container">
      <div className='retailer-header'>
        <p><b>Name:</b> {name}</p>
        <p><b>Adress:</b> {address}</p>
      </div>
      <div className='retailer-content'>
        {products.map(((product) => product.name))}
      </div>
    </div>
  )
}

export default Retailer1Component
