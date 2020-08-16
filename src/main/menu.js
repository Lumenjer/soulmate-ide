import { FiCloud, FiFolder, FiHome, FiSettings, FiSmile } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

import { FaUsb } from "react-icons/fa";
import UserDetails from "./userDetails";
import classnames from "classnames";

const iconClass =
  "mr-3 h-6 w-6 text-gray-400 group-hover:text-gray-300 group-focus:text-gray-300 transition ease-in-out duration-150";
const linkClass =
  "group flex items-center px-2 py-2 text-sm leading-5 font-medium text-gray-300 rounded-md hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700 transition ease-in-out duration-150";
const activeLinkClass = "bg-gray-700";
const menuBackgroundClass = "bg-gray-800 dark-mode:bg-gray-800";

const Menu = () => {
  const location = useLocation();

  return (
    <div className="flex flex-shrink-0 border-r dark-mode:border-gray-700">
      <div className="flex flex-col w-64">
        <div className="flex flex-col h-0 flex-1">
          <div
            className={classnames(
              "flex-1 flex flex-col pt-5 pb-4 px-2 overflow-y-auto",
              menuBackgroundClass
            )}
          >
            <nav className="mt-5 flex-1 space-y-1">
              <NavLink
                to="/"
                location={location}
                exact
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FiHome className={iconClass} />
                Home
              </NavLink>

              <NavLink
                tag={Link}
                to="/tutorial"
                location={location}
                exact
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FiSmile className={iconClass} />
                Tutorial
              </NavLink>

              <NavLink
                to="/my-patterns"
                location={location}
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FiFolder className={iconClass} />
                My Patterns
              </NavLink>

              <NavLink
                to="/gallery"
                location={location}
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FiCloud className={iconClass} />
                Gallery
              </NavLink>

              <NavLink
                to="/flash"
                disabled
                location={location}
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FaUsb className={iconClass} />
                USB Upload
              </NavLink>

              <NavLink
                to="/config"
                disabled
                location={location}
                activeClassName={activeLinkClass}
                className={linkClass}
              >
                <FiSettings className={iconClass} />
                Config
              </NavLink>
            </nav>
          </div>

          <UserDetails />
        </div>
      </div>
    </div>
  );
};

export default Menu;