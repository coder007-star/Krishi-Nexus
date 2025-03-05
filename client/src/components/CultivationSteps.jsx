const CultivationSteps = ({ steps }) => {
    return (
      <div className="my-6">
        {Object.entries(steps).map(([topic, description]) => {
          const formattedTopic = topic.replace(/_/g, " ");
          const points = description.split(/(?<!\b(?:[IVXLCDM]+|[A-Za-z]))\.\s+/).map(p => p.trim()).filter(p => p !== "");
  
          return (
            <section key={topic} className="bg-gray-100 p-4 rounded-lg my-4">
              <h2 className="text-xl font-semibold">{formattedTopic}</h2>
              <ul className="list-disc pl-6">
                {points.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </section>
          );
        })}
      </div>
    );
  };
  
  export default CultivationSteps;
  