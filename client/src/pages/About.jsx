const About = () => {
    return (
      <div className="min-h-screen bg-gray-100 p-10 text-center">
        <h1 className="text-3xl font-bold text-green-700">About Krishi Nexus</h1>
        <p className="mt-6 text-lg text-gray-700 leading-relaxed">
          Welcome to <span className="font-semibold text-green-600">Krishi Nexus</span>, your go-to platform for 
          <span className="font-semibold"> data-driven crop recommendations</span> powered by <span className="font-semibold">advanced Machine Learning models</span>. 
          Our mission is to revolutionize agriculture by providing farmers with actionable insights that maximize yield, optimize investments, and ensure 
          sustainable farming practices.
        </p>
  
        <h2 className="mt-8 text-2xl font-semibold text-green-700">What We Offer</h2>
  
        <div className="mt-4 text-left max-w-3xl mx-auto">
          <h3 className="text-xl font-semibold text-green-600">🌱 Machine Learning-Based Crop Recommendations</h3>
          <p className="mt-2 text-gray-700">
            Krishi Nexus utilizes cutting-edge <span className="font-semibold">AI-driven algorithms</span> to analyze soil quality, climate conditions, and regional 
            agricultural data to recommend the most suitable crops for your farm. This ensures that farmers make informed, data-backed decisions to 
            minimize risks and increase productivity.
          </p>
  
          <h3 className="mt-6 text-xl font-semibold text-green-600">🌦️ Integrated Weather Forecasting System</h3>
          <p className="mt-2 text-gray-700">
            Our platform includes a <span className="font-semibold">5-day weather forecasting tool</span> that provides real-time updates on 
            temperature, humidity, rainfall, and wind speed. This allows farmers to plan their irrigation, fertilization, and harvesting schedules more effectively, 
            reducing losses due to unpredictable weather conditions.
          </p>
  
          <h3 className="mt-6 text-xl font-semibold text-green-600">📖 Comprehensive Cultivation Guidelines</h3>
          <p className="mt-2 text-gray-700">
            Beyond crop recommendations, we provide <span className="font-semibold">detailed cultivation guidelines</span> for each suggested crop, including:
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Best farming techniques for maximum yield</li>
            <li>Optimal sowing and harvesting timelines</li>
            <li>Recommended fertilizers and pest control measures</li>
            <li>Step-by-step crop growth monitoring</li>
          </ul>
  
          <h3 className="mt-6 text-xl font-semibold text-green-600">💰 Financial Planning – Investment & Profit Estimation</h3>
          <p className="mt-2 text-gray-700">
            We help farmers with financial planning by providing a <span className="font-semibold">breakdown of initial investment costs per acre</span>, including:
          </p>
          <ul className="mt-2 list-disc list-inside text-gray-700">
            <li>Seed costs</li>
            <li>Fertilizer and pesticide expenses</li>
            <li>Irrigation and labor costs</li>
          </ul>
          <p className="mt-2 text-gray-700">
            Additionally, we estimate <span className="font-semibold">potential profits per acre</span> based on factors like market pricing trends, expected crop yield, and 
            best-selling periods to maximize revenue.
          </p>
        </div>
  
        <h2 className="mt-10 text-2xl font-semibold text-green-700">Our Vision</h2>
        <p className="mt-4 text-lg text-gray-700 leading-relaxed">
          At <span className="font-semibold text-green-600">Krishi Nexus</span>, we believe in empowering farmers with the right <span className="font-semibold">technology and knowledge</span> to make 
          informed decisions. By combining <span className="font-semibold">Machine Learning-powered recommendations</span>, <span className="font-semibold">real-time weather forecasting</span>, 
          and <span className="font-semibold">detailed financial insights</span>, we aim to make agriculture more <span className="font-semibold">efficient, profitable, and sustainable</span>.
        </p>
  
        <p className="mt-6 text-lg font-semibold text-green-600">Join us in shaping the future of smart farming with Krishi Nexus! 🌿🚜</p>
      </div>
    );
  };
  
  export default About;
  