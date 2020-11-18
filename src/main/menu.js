import classnames from "classnames";
import { BsTerminal } from "react-icons/bs";
import { FaUsb } from "react-icons/fa";
import { FiCloud, FiFolder, FiHome, FiSettings, FiSmile } from "react-icons/fi";
import { Link, NavLink, useLocation } from "react-router-dom";

import Logo from "~/images/logo.svg";
import isElectron from "~/utils/isElectron";

import square from "./Square.jpg";
import UserDetails from "./userDetails";

const iconClass = "mr-3 h-6 w-6 transition ease-in-out duration-150";
const linkClass = `group flex items-center px-4 py-2 text-sm leading-5 font-medium rounded-md
hover:bg-gray-300
dark-mode:hover:text-white
dark-mode:hover:bg-gray-600
  transition ease-in-out duration-150`;
const activeLinkClass = `
  dark-mode:bg-gray-800
  dark-mode:hover:bg-gray-800
  bg-gray-300`;

const Menu = () => {
  const location = useLocation();

  return (
    <div
      className={classnames(
        "flex flex-shrink-0 border-r",
        "bg-gray-200",
        "dark-mode:border-gray-600 dark-mode:bg-gray-700 dark-mode:text-white"
      )}
    >
      <div className="flex flex-col w-72">
        <div className="flex flex-col flex-1 h-0">
          <div className="flex flex-col flex-1 pb-4 overflow-y-auto">
            <div className="flex flex-row items-center h-20 px-6 py-4 border-b dark-mode:border-gray-600">
              <Logo className="w-10 h-10 mr-4" />

              <span className="flex flex-col">
                <span>
                  Soulmate&nbsp;<span className="opacity-50">IDE</span>
                </span>
                <span className="text-sm opacity-50">
                  FastLED ESP32 Emulator
                </span>
              </span>
            </div>

            <nav className="flex-1 mx-2 mt-4 space-y-1">
              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                exact
                location={location}
                to="/"
              >
                <FiHome className={iconClass} />
                Home
              </NavLink>

              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                exact
                location={location}
                tag={Link}
                to="/tutorial"
              >
                <FiSmile className={iconClass} />
                Tutorial
              </NavLink>

              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                location={location}
                to="/my-patterns"
              >
                <FiFolder className={iconClass} />
                My Patterns
              </NavLink>

              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                location={location}
                to="/gallery"
              >
                <FiCloud className={iconClass} />
                Gallery
              </NavLink>

              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                location={location}
                to="/flash"
              >
                <FaUsb className={iconClass} />
                USB Upload
              </NavLink>

              {isElectron() && (
                <NavLink
                  activeClassName={activeLinkClass}
                  className={linkClass}
                  location={location}
                  to="/console"
                >
                  <BsTerminal className={iconClass} />
                  Console
                </NavLink>
              )}

              <NavLink
                activeClassName={activeLinkClass}
                className={linkClass}
                disabled
                location={location}
                to="/config"
              >
                <FiSettings className={iconClass} />
                Config
              </NavLink>
            </nav>

            <a
              className="mx-8 mt-auto mb-4 overflow-hidden text-xs bg-gray-300 rounded-lg dark-mode:bg-gray-800 align-center"
              href="https://shop.soulmatelights.com/products/square"
              rel="noopener noreferrer"
              target="_blank"
            >
              <div
                className="bg-center bg-cover"
                style={{ backgroundImage: `url(${square})` }}
              >
                <br />
                <br />
                <br />
                <br />
              </div>
              <div className="p-2 text-center">
                <p className="font-semibold">Buy a Soulmate Square!</p>
                <p className="font-light">$199 + shipping</p>
              </div>
            </a>

            {/* <a
              className="flex flex-row h-16 mx-6 mt-auto mb-8 overflow-hidden text-xs bg-gray-300 rounded-lg align-center"
              href="https://shop.soulmatelights.com/products/square"
              rel="noopener noreferrer"
              target="_blank"
            >
              <img className="flex-grow-0 h-full" src={square} />
              <div className="flex flex-col flex-shrink-0 p-4">
                <p>Buy a Square!</p>
                <p>$199 + shipping</p>
              </div>
            </a> */}
          </div>

          <UserDetails className={`border-t dark-mode:border-gray-600`} />
        </div>
      </div>
    </div>
  );
};

export default Menu;
