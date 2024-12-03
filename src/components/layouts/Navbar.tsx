import { Link } from "react-router-dom";
import SettingsModal from "../SettingsModal";
import { IoMdSettings } from "react-icons/io";
import { IconButton } from "@mui/material";
import { useState } from "react";
import { TiNews } from "react-icons/ti";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="navbar bg-primary">
        <h1 className="text-white font-bold">
          <TiNews size={20} />
          News Grid
        </h1>
        <ul>
          <li>
            <Link to={"/"}>Search</Link>
          </li>
          <li>
            <Link to={"/feed"}>Feed</Link>
          </li>
          <li>
            <IconButton onClick={() => setOpen(true)}>
              <IoMdSettings color="white" />
            </IconButton>
          </li>
        </ul>
      </nav>
      <SettingsModal open={open} handleClose={() => setOpen(false)} />
    </>
  );
};

export default Navbar;
