import NavItem from "./NavItem";

const MobileMenu = ({ menuOpen }) => (
  menuOpen && (
    <div className="md:hidden flex flex-col items-center space-y-4 p-4 bg-white shadow-md">
      <NavItem to="/" label="Home" />
      <NavItem to="/crop" label="Predict Crop" />
      <NavItem to="/about" label="About Us" />
    </div>
  )
);

export default MobileMenu;
