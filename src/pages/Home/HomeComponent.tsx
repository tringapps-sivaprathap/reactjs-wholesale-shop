import { FC, useState } from "react"
import WholesalerComponent from "./components/Wholesaler/WholesalerComponent"
import RetailersComponent from "./components/Retailers/RetailersComponent"
import OverlayComponent from "../../sharedComponents/Overlay/OverlayComponent"
import { Retailer } from "../../interfaces/RetailerInterface"
import "./HomeComponent.scss"

const HomeComponent: FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [retailer, setRetailer] = useState<Retailer>({} as Retailer)

  return (
    <>
      <div className="home-container">
        <WholesalerComponent setRetailer={setRetailer} setShowOverlay={setShowOverlay} />
        <RetailersComponent />
      </div>

      {showOverlay && <OverlayComponent retailer={retailer} setShowOverlay={setShowOverlay}/>}
    </>
  )
}

export default HomeComponent