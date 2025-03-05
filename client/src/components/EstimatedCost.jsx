const EstimatedCost = ({ cost }) => {
    return (
      <div className="bg-yellow-100 p-4 rounded-lg my-6">
        <h2 className="text-xl font-bold">Estimated Cost (per hectare):</h2>
        <p className="text-lg font-semibold text-red-500">₹{cost}</p>
      </div>
    );
  };
  
  export default EstimatedCost;
  