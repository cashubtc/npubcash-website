import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import AddressSection from "./components/AddressSection";

function HomeRoute() {
  return (
    <main className="flex items-center flex-col">
      <Hero />
      <FeatureCards />
      <AddressSection />
    </main>
  );
}

export default HomeRoute;
