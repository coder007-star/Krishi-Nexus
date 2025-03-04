import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import NavItem from "./NavItem";

const Navbar = ({ menuOpen, setMenuOpen }) => (
  <nav className="fixed top-0 left-0 w-full bg-white shadow-md p-4 flex justify-between items-center z-50">
    <div className="flex items-center space-x-3">
      <img src="/images/logo.png" alt="logo" className="h-10" />
      <strong className="text-lg font-semibold">
        <Link to="/">Krishi Nexus</Link>
      </strong>
    </div>
    <div className="hidden md:flex space-x-6">
      <NavItem to="/" label="Home" />
      <NavItem to="/crop" label="Predict Crop" />
      <NavItem to="/weather" label="Weather" />
      <NavItem to="/about" label="About Us" />
    </div>
    <button className="md:hidden text-xl" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <FaTimes /> : <FaBars />}
    </button>
  </nav>
);

export default Navbar;
