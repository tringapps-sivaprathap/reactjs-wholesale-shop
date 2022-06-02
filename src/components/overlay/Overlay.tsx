import '../../assets/overlay.css'

type OverlayProps = {
  setShowOverlay: (argument: boolean) => void
}

const Overlay = ({ setShowOverlay }: OverlayProps) => {
  return (
    <div className="overlay-container">
      <div className='overlay'>
        address
        <button onClick={() => setShowOverlay(false)}>Cancel</button>
      </div>
    </div>
  )
}

export default Overlay
