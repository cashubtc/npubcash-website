import { FaKey, FaSignature, FaCode } from "react-icons/fa6";
import FeatureCard from "./FeatureCard";

function FeatureCards() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 my-4 max-w-4xl px-8 w-full opacity-0 animate-fadein [animation-delay:400ms]">
      <FeatureCard
        icon={<FaSignature />}
        title="No Sign-Up"
        body="Built on top of nostr identities and signatures"
      />
      <FeatureCard
        icon={<FaKey />}
        title="Trust Minimized"
        body="Balance is locked to your public key"
      />
      <FeatureCard
        icon={<FaKey />}
        title="Offline Payments"
        body="Cashu acts as a layer for offline payments"
      />
      <FeatureCard
        icon={<FaCode />}
        title="Open Source"
        body="Cashu-Address is FOSS and can be self-hosted"
      />
    </section>
  );
}

export default FeatureCards;
