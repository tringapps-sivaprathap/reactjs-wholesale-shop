import { FC } from 'react';
import { Retailer } from '../../../../../interfaces/RetailerInterface';
import './RetailerComponent.scss';

interface RetailerProps {
  retailer: Retailer
}

const RetailerComponent: FC<RetailerProps> = ({ retailer }) => {
  const { name, address, products, date } = retailer;

  return (
    <div className="retailer">
      <div className='retailer__header'>
        <p><span>Name:</span> {name}</p>
        <p><span>Adress:</span> {address}</p>
      </div>

      <div className={ products.length === 0 ? 'retailer__body--empty' : 'retailer__body'}>
        {products.length === 0 && <p>Haven't purchased yet!</p>}
        {products.map((product) => (
          <div className='product' key={product.name}>
            <p>Date: {new Date(date).toLocaleDateString().slice(0, 10).replaceAll('/', '-')}</p>
            <p>Product: {product.name}</p>
            <p>Quantity: {product.stock}{product.unit}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RetailerComponent;
