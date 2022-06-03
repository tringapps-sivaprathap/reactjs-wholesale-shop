import { useAppSelector } from '../../../../redux/hook'
import './RetailersComponents.css'

const Retailer2Component = () => {
  const { name, address, products } = useAppSelector((state) => state.retailers.retailers.retailer1)
  return (
    <div className="retailer retailer-2-container">
      <div className='retailer-header'>
        <span>Name: {name}</span>
        <span>Adress: {address}</span>
      </div>
      <div className='retailer-content'>
        {products.map(((product) => product.name))}
      </div>
    </div>
  )
}

export default Retailer2Component
