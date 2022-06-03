import './RetailerComponent.scss'

type RetailerProps = {
  retailer: {
    id: string,
    c_user: boolean,
    name: string,
    address: string,
    products: {
      name: string,
      stock: number
    }[]
  }
}

const RetailerComponent = ( { retailer }: RetailerProps) => {
  const { name, address, products } = retailer

  return (
    <div className="retailer-container">
      <div className='retailer-header'>
        <p><b>Name:</b> {name}</p>
        <p><b>Adress:</b> {address}</p>
      </div>

      <div className='retailer-content'>
        {products.map(((product) => product.name))}
      </div>
    </div>
  )
}

export default RetailerComponent
