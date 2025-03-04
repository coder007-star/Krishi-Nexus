import Feature from "../components/Feature";
import { FaSeedling, FaCloudSun, FaChartLine } from "react-icons/fa";

const Home = () => {
  return (
    <div className=" bg-gray-50">
      {/* Hero Section */}
      <header className="text-center py-16 bg-green-700 text-white">
        <h1 className="text-4xl font-bold">Smart Agriculture for a Sustainable Future</h1>
        <p className="mt-2 text-lg">Helping farmers make informed decisions with AI-powered insights.</p>
      </header>

      {/* Features Section */}
      <section className="p-8 grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        <Feature
          title="Crop Recommendation"
          description="Get AI-based crop suggestions based on soil, climate, and season."
          link="/crop"
          linkText="Predict Now"
          icon={<FaSeedling className="text-green-600 text-4xl" />}
        />

        <Feature
          title="Weather Forecast"
          description="Stay ahead with real-time weather updates for your region."
          link="/weather"
          linkText="Check Weather"
          icon={<FaCloudSun className="text-blue-500 text-4xl" />}
        />

        <Feature
          title="Market Trends"
          description="Track market prices and trends to maximize your crop earnings."
          icon={<FaChartLine className="text-yellow-500 text-4xl" />}
        />
      </section>
    </div>
  );
};

export default Home;
