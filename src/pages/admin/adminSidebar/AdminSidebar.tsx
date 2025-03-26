import { useState, useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import {
  BoxIcon,
  CloseIcon,
  SquareIcons,
  HamburgerIcon,
} from "../../../assets/icons/Icons";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  const handleCloseSidebar = () => setIsOpen(false);
  const handleToggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {isOpen && (
        <div
          className={styles["sidebar-overlay"]}
          onClick={handleCloseSidebar}
        ></div>
      )}
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}
      >
        <div className={styles["sidebar-header"]}>
          <span className={styles["sidebar-title"]}>
            <BoxIcon />
            <span>E-Commerce</span>
          </span>
          <button className={styles["close-btn"]} onClick={handleCloseSidebar}>
            <CloseIcon />
          </button>
        </div>

        <nav className={styles["sidebar-nav"]}>
          <ul>
            <li>
              <NavLink
                to="/auth/admin"
                className="flex gap-2 font-medium hover:text-blue-400"
                style={({ isActive }) => ({
                  color: isActive ? "#2979ff" : "inherit",
                })}
                end
              >
                <SquareIcons />
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/auth/admin/products"
                className="flex gap-2 font-medium hover:text-blue-400"
                style={({ isActive }) => ({
                  color: isActive ? "#2979ff" : "inherit",
                })}
              >
                <SquareIcons />
                All Product
              </NavLink>
            </li>
          </ul>
        </nav>
      </aside>
      <button
        onClick={handleToggleSidebar}
        className={styles["sidebar-toggle-btn"]}
      >
        <HamburgerIcon />
      </button>
    </>
  );
};

export default AdminSidebar;
