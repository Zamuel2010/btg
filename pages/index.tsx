import type { NextPage } from "next";
import BuyCard from "../components/BuyCard";
import SwapCard from "../components/SwapCard";
import Dashboard from "../components/Dashboard";

const Home: NextPage = () => {
  return (
    <div className="space-y-6">
      <section>
        <BuyCard />
      </section>

      <section>
        <SwapCard />
      </section>

      <section>
        <Dashboard />
      </section>
    </div>
  );
};

export default Home;
