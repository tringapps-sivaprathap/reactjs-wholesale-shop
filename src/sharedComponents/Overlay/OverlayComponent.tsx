import { FC } from 'react';
import { Retailer } from '../../interfaces/RetailerInterface';
import { FaWindowClose } from 'react-icons/fa';
import PurchaseComponent from '../../pages/Home/components/Purchase/PurchaseComponent';
import './OverlayComponent.scss';

interface OverlayComponentProps {
  retailer: Retailer,
  setShowOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const OverlayComponent: FC<OverlayComponentProps> = ({ retailer, setShowOverlay }) => {
  return (
    <div className="overlay__container">
      <div className='overlay'>
        <div className='overlay__header'>
          <span><span>Name:</span> {retailer.name}</span>
          <span><span>Address:</span> {retailer.address}</span>
          <button className='overlay-close'><FaWindowClose onClick={() => setShowOverlay(false)} /></button>
        </div>

        <div className='overlay__body'>
          <PurchaseComponent retailer={retailer} setShowOverlay={setShowOverlay} />
        </div>
      </div>
    </div>
  );
};

export default OverlayComponent;