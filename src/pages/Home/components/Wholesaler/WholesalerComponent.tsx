import { FC } from 'react'
import { useAppSelector } from '../../../../redux/hook'
import { Retailer } from '../../../../interfaces/RetailerInterface'
import './WholesalerComponent.scss'

interface WholesalerComponentProps {
  setRetailer: React.Dispatch<React.SetStateAction<Retailer>>,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const WholesalerComponent: FC<WholesalerComponentProps> = ({ setRetailer, setShowOverlay }) => {
  const retailers = useAppSelector((state) => state.retailers.retailers)
  const name = useAppSelector((state) => state.wholesaler.name)

  return (
    <div className="wholesaler-container">
      <h2>{name}</h2>
      
      {retailers.map((retailer) => (
        <div key={retailer.id}>
          <span>{retailer.name}</span>
          <button onClick={() => {setShowOverlay(true); setRetailer(retailer);}}>Supply</button>
        </div>
      ))}
    </div>
  )
}

export default WholesalerComponent