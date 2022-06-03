import './WholesalerComponent.scss'

type WholesalerComponentProps = {
  setShowOverlay: (argument: boolean) => void
}

const WholesalerComponent = ({ setShowOverlay }: WholesalerComponentProps) => {
  return (
    <div className="wholesaler-container">
      <h2>Name: Sivaprathap</h2>
      
      <div>
        <span>Retailer 1</span>
        <button onClick={() => setShowOverlay(true)}>Supply</button>
      </div>

      <div>
        <span>Retailer 2</span>
        <button onClick={() => setShowOverlay(true)}>Supply</button>
      </div>

      <div>
        <span>Retailer 3</span>
        <button onClick={() => setShowOverlay(true)}>Supply</button>
      </div>
    </div>
  )
}

export default WholesalerComponent
