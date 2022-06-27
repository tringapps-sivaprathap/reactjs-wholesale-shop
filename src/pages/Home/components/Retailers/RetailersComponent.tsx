import { FC } from 'react';
import { useAppSelector } from '../../../../app/hook';
import RetailerComponent from './Retailer/RetailerComponent';
import './RetailersComponent.scss';

const RetailersComponent: FC = () => {
  const retailers = useAppSelector((state) => state.retailers.retailers);

  return (
    <div className="retailers">
      {retailers.map((retailer) => <RetailerComponent key={retailer.id} retailer={retailer} />)}
    </div>
  );
};

export default RetailersComponent;