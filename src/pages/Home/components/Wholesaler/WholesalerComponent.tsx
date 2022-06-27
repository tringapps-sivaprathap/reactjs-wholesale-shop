import { FC, useState } from "react";
import { useAppSelector } from '../../../../app/hook';
import { Retailer } from '../../../../interfaces/RetailerInterface';
import OverlayComponent from "../../../../sharedComponents/Overlay/OverlayComponent";
import './WholesalerComponent.scss';

const WholesalerComponent: FC = () => {
  const [showOverlay, setShowOverlay] = useState<boolean>(false)
  const [retailer, setRetailer] = useState<Retailer>({} as Retailer)
  const retailers = useAppSelector((state) => state.retailers.retailers)
  const name = useAppSelector((state) => state.wholesaler.name)

  return (
    <>
      <div className="wholesaler">
        <h2 className='wholesaler__name'>{name}</h2>
        
        {retailers.map((retailer) => (
          <div className='retailer' key={retailer.id}>
            <span className='retailer__name'>{retailer.name}</span>
            <button className='retailer__supply' onClick={() => {setShowOverlay(true); setRetailer(retailer);}}>Supply</button>
          </div>
        ))}
      </div>

      {showOverlay && <OverlayComponent retailer={retailer} setShowOverlay={setShowOverlay}/>}
    </>
  );
};

export default WholesalerComponent;