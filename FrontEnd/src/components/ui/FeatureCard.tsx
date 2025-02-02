import { ReactNode } from "react";

interface Feature {
  icon: ReactNode;
  title: string; // Use `string`, not `String` (lowercase `s`)
  description: string;
}

const FeatureCard = ({ icon, title, description }: Feature) => {
  return (
    <div className="bg-white p-8 rounded-xl border border-gray-200">
      <div className="w-12 h-12 bg-indigo-50 rounded-lg flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
