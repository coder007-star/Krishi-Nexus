import { Link } from "react-router-dom";

const Feature = ({ title, description, link, linkText, icon }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 text-center">
      <div className="mb-4 flex justify-center">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 mt-2">{description}</p>

      {link && (
        <div className="mt-4">
          {link.startsWith("http") ? (
            <a
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 font-medium hover:underline"
            >
              {linkText}
            </a>
          ) : (
            <Link
              to={link}
              className="text-green-600 font-medium hover:underline"
            >
              {linkText}
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default Feature;
