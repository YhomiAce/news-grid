import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg-primary">
      <h1 className="text-white font-bold">
        {/* <i className="fab fa-github" /> Github Finder */}
        News Finder
      </h1>
      <ul>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/settings"}>Personalize</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
