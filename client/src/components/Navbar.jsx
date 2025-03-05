import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useState, useEffect } from "react";
import NavItem from "./NavItem";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuOpen && !event.target.closest(".mobile-menu")) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => document.removeEventListener("click", handleOutsideClick);
  }, [menuOpen]);

  // Handle search
  const handleSearch = () => {
    if (search.trim() !== "") {
      navigate(`/crop/${search.trim().toLowerCase()}`);
      setSearch(""); // Clear input after search
      setMenuOpen(false); // Close mobile menu if open
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
      <div className="flex items-center space-x-3">
        <img src="/images/logo.png" alt="logo" className="h-10" />
        <strong className="text-lg font-semibold">
          <Link to="/">Krishi Nexus</Link>
        </strong>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex space-x-6 items-center">
        <NavItem to="/" label="Home" />
        <NavItem to="/crop" label="Predict Crop" />
        <NavItem to="/weather" label="Weather" />
        <NavItem to="/about" label="About Us" />

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Find Crop..."
            className="border border-gray-300 px-3 py-1 rounded-md text-black focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            onClick={handleSearch}
            className="px-3 py-1 bg-green-600 text-white rounded-md ml-2 hover:bg-green-700"
          >
            Search
          </button>
        </div>
      </div>

      {/* Hamburger Button */}
      <button
        className="md:hidden text-xl z-50"
        onClick={(e) => {
          e.stopPropagation();
          setMenuOpen(!menuOpen);
        }}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Slide-in Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 mobile-menu ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } md:hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-5 flex flex-col space-y-4">
          <NavItem to="/" label="Home" onClick={() => setMenuOpen(false)} />
          <NavItem to="/crop" label="Predict Crop" onClick={() => setMenuOpen(false)} />
          <NavItem to="/weather" label="Weather" onClick={() => setMenuOpen(false)} />
          <NavItem to="/about" label="About Us" onClick={() => setMenuOpen(false)} />

          {/* Search Bar in Mobile Menu */}
          <div className="relative">
            <input
              type="text"
              placeholder="Find Crop..."
              className="border border-gray-300 px-3 py-1 rounded-md text-black w-full focus:outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={handleSearch}
              className="w-full mt-2 px-3 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
            >
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
