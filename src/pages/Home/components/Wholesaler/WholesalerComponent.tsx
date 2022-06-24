import { FC } from 'react'
import { useAppSelector } from '../../../../app/hook'
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
    <div className="wholesaler">
      <h2 className='wholesaler__name'>{name}</h2>
      
      {retailers.map((retailer) => (
        <div className='retailer' key={retailer.id}>
          <span className='retailer__name'>{retailer.name}</span>
          <button className='retailer__supply' onClick={() => {setShowOverlay(true); setRetailer(retailer);}}>Supply</button>
        </div>
      ))}
    </div>
  )
}

export default WholesalerComponent