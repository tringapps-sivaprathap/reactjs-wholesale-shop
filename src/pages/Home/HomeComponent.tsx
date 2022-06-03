import { useState } from "react"
import WholesalerComponent from "./components/Wholesaler/WholesalerComponent"
import RetailersComponent from "./components/Retailers/RetailersComponent"
import OverlayComponent from "../../sharedComponents/Overlay/OverlayComponent"
import "./HomeComponent.scss"

const HomeComponent = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="home-container">
      <WholesalerComponent setShowOverlay={setShowOverlay} />
      <RetailersComponent />
      {showOverlay && <OverlayComponent setShowOverlay={setShowOverlay}/>}
    </div>
  )
}

export default HomeComponent