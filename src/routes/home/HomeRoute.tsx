import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import Diagram from "./components/Diagram";

function HomeRoute() {
  return (
    <main className="flex items-center flex-col">
      <Hero />
      <FeatureCards />
      <Diagram />
    </main>
  );
}

export default HomeRoute;
