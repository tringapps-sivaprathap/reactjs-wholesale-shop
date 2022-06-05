import { FC } from 'react'
import { useAppSelector } from '../../../../redux/hook'
import './WholesalerComponent.scss'

interface Retailer {
  id: string,
  c_user: boolean,
  name: string,
  address: string,
  products: {
    name: string,
    stock: number
  }[]
}

type WholesalerComponentProps = {
  setRetailer: React.Dispatch<React.SetStateAction<Retailer>>,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const WholesalerComponent: FC<WholesalerComponentProps> = ({ setRetailer, setShowOverlay }) => {
  const retailers = useAppSelector((state) => state.retailers.retailers)

  return (
    <div className="wholesaler-container">
      <h2>Name: Sivaprathap</h2>
      
      {retailers.map((retailer) => (
        <div key={retailer.id}>
          <span>{retailer.name} Shop</span>
          <button onClick={() => {setShowOverlay(true); setRetailer(retailer);}}>Supply</button>
        </div>
      ))}
    </div>
  )
}

export default WholesalerComponent