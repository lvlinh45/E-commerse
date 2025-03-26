import { useRef } from "react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import { BoxIcon, CloseIcon, SquareIcons } from "../../../assets/icons/Icons";

const AdminSidebar = () => {
  const isOpen = true;
  const sidebarRef = useRef<HTMLDivElement | null>(null);

  return (
    <>
      {isOpen && <div className={styles["sidebar-overlay"]}></div>}

      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isOpen ? "open" : ""}`}
      >
        <div className={styles["sidebar-header"]}>
          <span className={styles["sidebar-title"]}>
            <BoxIcon></BoxIcon>
            <span>E-Commerce</span>
          </span>
          <button className={styles["close-btn"]}>
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
    </>
  );
};

export default AdminSidebar;
