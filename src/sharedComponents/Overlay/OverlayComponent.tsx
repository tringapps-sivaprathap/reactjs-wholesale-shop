import { FC } from 'react'
import PurchaseComponent from '../../pages/Home/components/Retailers/Purchase/PurchaseComponent'
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

const OverlayComponent: FC<OverlayComponentProps> = ({ retailer, setShowOverlay }) => {
  return (
    <div className="overlay-container">
      <div className='overlay'>
        <div className='overlay-header'>
          <span><span>Name:</span> {retailer.name}</span>
          <span><span>Address:</span> {retailer.address}</span>
        </div>
        <div className='overlay-content'>
          <PurchaseComponent retailer={retailer} setShowOverlay={setShowOverlay} />
        </div>
      </div>
    </div>
  )
}

export default OverlayComponent