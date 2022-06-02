import { useState } from "react"
import WholesalerComponent from './components/Wholesaler/WholesalerComponent'
import Retailer1Component from './components/Retailers/Retailer1Component'
import Retailer2Component from './components/Retailers/Retailer2Component'
import Retailer3Component from './components/Retailers/Retailer3Component'
import OverlayComponent from "../../sharedComponents/Overlay/OverlayComponent"
import './HomeComponent.css'

const HomeComponent = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="home-container">
      <WholesalerComponent setShowOverlay={setShowOverlay} />
      <Retailer1Component />
      <Retailer2Component />
      <Retailer3Component />
      {showOverlay && <OverlayComponent setShowOverlay={setShowOverlay}/>}
    </div>
  )
}

export default HomeComponent