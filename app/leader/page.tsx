import ShowCarousel from "../_components/Carousel";
import { Footer } from "../_components/Footer";
import { Leaderboard } from "../_components/Leaderboard";

const Leader = () => {
  return (
    <div>
      <ShowCarousel />

      <div>
        <Leaderboard />
      </div>
      <Footer />
    </div>
  );
};
export default Leader;
