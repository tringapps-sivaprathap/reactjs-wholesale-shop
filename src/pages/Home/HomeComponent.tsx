import { FC } from "react";
import WholesalerComponent from "./components/Wholesaler/WholesalerComponent";
import RetailersComponent from "./components/Retailers/RetailersComponent";
import "./HomeComponent.scss";

const HomeComponent: FC = () => {
  return (
    <div className="home">
      <WholesalerComponent />
      <RetailersComponent />
    </div>
  );
};

export default HomeComponent;