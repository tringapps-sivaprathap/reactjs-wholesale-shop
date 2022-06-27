import { FC } from 'react';
import { Retailer } from '../../../../../interfaces/RetailerInterface';
import './RetailerComponent.scss';

interface RetailerProps {
  retailer: Retailer
}

const RetailerComponent: FC<RetailerProps> = ({ retailer }) => {
  const { name, address, products } = retailer;

  return (
    <div className="retailer">
      <div className='retailer__header'>
        <p><span>Name:</span> {name}</p>
        <p><span>Adress:</span> {address}</p>
      </div>

      <div className='retailer__body'>
        {products.map((product) => (
          <div className='product' key={product.name}>
            <p>Product: {product.name}</p>
            <p>Quantity: {product.stock}{product.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerComponent;
