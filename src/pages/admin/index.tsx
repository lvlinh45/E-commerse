import { Outlet } from "react-router-dom";
import AdminSidebar from "./adminSidebar/AdminSidebar";
import styles from "./Layout.module.scss";

const Layout = () => {
  return (
    <div className={styles.layout}>
      <div className={styles["sidebar-container"]}>
        <AdminSidebar />
      </div>
      <div className={styles["content-container"]}>
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
