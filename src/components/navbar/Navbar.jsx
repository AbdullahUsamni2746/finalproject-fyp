import "./navbar.scss";

import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useEffect, useState } from "react";
import {} from "@mui/icons-material";

const Navbar = () => {
  const { dispatch } = useContext(DarkModeContext);
  const [state, setState] = useState("dark");
  useEffect(() => {
    console.log("Stat Updated");
    console.log(state);
  }, [state]);

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          {/* <input type="text" placeholder="Search..." />
          <SearchOutlinedIcon /> */}
        </div>
        <div
          className="item"
          onClick={() => {
            state === "dark" ? setState("light") : setState("dark");
          }}
        >
          {state === "dark" ? (
            <DarkModeOutlinedIcon
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          ) : (
            <LightModeOutlinedIcon onClick={dispatch({ type: "TOGGLE" })} />
          )}
        </div>

        {/* <div className="item">
            <img
              src="https://images.pexels.com/photos/941693/pexels-photo-941693.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="avatar"
            />
          </div> */}
      </div>
    </div>
  );
};

export default Navbar;
