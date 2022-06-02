import Wholesaler from "./components/wholesaler/Wholesaler"
import Retailer1 from "./components/retailers/Retailer1"
import Retailer2 from "./components/retailers/Retailer2"
import Retailer3 from "./components/retailers/Retailer3"
import Overlay from "./components/overlay/Overlay"
import { useState } from "react"

const App = () => {
  const [showOverlay, setShowOverlay] = useState(false);

  return (
    <div className="base-container">
      <Wholesaler setShowOverlay={setShowOverlay} />
      <Retailer1 />
      <Retailer2 />
      <Retailer3 />
      {showOverlay && <Overlay setShowOverlay={setShowOverlay}/>}
    </div>
  )
}

export default App