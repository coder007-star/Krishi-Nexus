import { Link } from "react-router-dom";

const NavItem = ({ to, label }) => (
  <Link to={to} className="hover:text-green-600">{label}</Link>
);

export default NavItem;
