import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import Diagram from "./components/Diagram";
import Footer from "../../components/Footer";

function HomeRoute() {
  return (
    <main className="flex items-center flex-col">
      <Hero />
      <FeatureCards />
      <Diagram />
      {/* TODO: Footer Styling */}
      <Footer />
    </main>
  );
}

export default HomeRoute;
