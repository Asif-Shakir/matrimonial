import "./sidebar.css";
import DashboardIcon from "@mui/icons-material/Dashboard";
import HolidayVillageIcon from "@mui/icons-material/HolidayVillage";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import { NavLink } from "react-router-dom";
import appRoutes from "../../shared/routes/appRoutes";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="top">
        <span className="logo">Matrimonial</span>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">MAIN</p>
          <li>
            <a href="#">
              <DashboardIcon className="icon" />
              Dashboard
            </a>
          </li>
          <p className="title">CONFIGRATIONS</p>
          <li>
            <NavLink to={appRoutes.Configrations.State}>
              <HolidayVillageIcon className="icon" />
              State
            </NavLink>
          </li>
          <li>
            <NavLink to={appRoutes.Configrations.City}>
              <LocationCityIcon className="icon" />
              City
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
