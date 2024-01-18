import { ReactNode } from "react";

type FeatureCardPorps = {
  icon: ReactNode;
  title: string;
  body: string;
};

function FeatureCard({ icon, title, body }: FeatureCardPorps) {
  return (
    <div className="flex flex-col items-center p-4 bg-zinc-800 shadow-lg rounded">
      <div className="text-2xl text-purple-400 rounded-full mb-4">{icon}</div>
      <p className="text-lg  font-bold">{title}</p>
      <p className="text-center text-purple-400 text-sm">{body}</p>
    </div>
  );
}

export default FeatureCard;
