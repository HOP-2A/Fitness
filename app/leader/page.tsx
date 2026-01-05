import { Footer } from "../_components/Footer";
import { Leaderboard } from "../_components/Leaderboard";
import CoinPage from "../_components/ShowCoin";

const Leader = () => {
  return (
<<<<<<< HEAD
    <div>
      <div>
        <Leaderboard />
=======
    <div className="bg-gradient-to-b from-blue-800 to-red">
      <div className="flex justify-between">
        <div className="m-15">
          <Leaderboard />
        </div>
        <div className="m-15">
          <ShowCarousel />
        </div>
        <div className="m-15">
          <CoinPage />
        </div>
>>>>>>> e092976 (css)
      </div>
      <Footer />
    </div>
  );
};
export default Leader;
