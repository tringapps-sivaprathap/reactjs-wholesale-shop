import './OverlayComponent.css'

type OverlayComponentProps = {
  setShowOverlay: (argument: boolean) => void
}

const OverlayComponent = ({ setShowOverlay }: OverlayComponentProps) => {
  return (
    <div className="overlay-container">
      <div className='overlay'>
        address
        <button onClick={() => setShowOverlay(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default OverlayComponent
