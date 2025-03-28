import { useState, useRef, useEffect } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.scss";
import {
  BoxIcon,
  CloseIcon,
  SquareIcons,
  HamburgerIcon,
  LogOutIcon,
} from "../../../assets/icons/Icons";
import { accountAdmin } from "../../../constants/accountAdmin";
import Swal from "sweetalert2";
import { AccountAdmin } from "../../../assets/types/Users";

const AdminSidebar = () => {
  const location = useLocation();
  const userIdParam = location.state?.userId;
  useEffect(() => {
    setUserId(userIdParam);
  }, [userIdParam]);
  const [userId, setUserId] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const sidebarRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const handleCloseSidebar = () => setIsOpen(false);
  const handleToggleSidebar = () => setIsOpen(!isOpen);
  const [userInfo, setUserInfo] = useState<AccountAdmin>();
  useEffect(() => {
    const user = accountAdmin.find(
      (account) => account.id === parseInt(userId)
    );
    if (user) {
      setUserInfo({
        ...user,
        status: user.status as "active" | "inactive",
      });
    }
  }, [userId]);
  const handleLogout = () => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn đăng xuất?",
      text: "Bạn sẽ bị đưa về trang đăng nhập.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đăng xuất",
      cancelButtonText: "Hủy",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.setItem("auth", "false");
        navigate("/auth/login");
      }
    });
  };

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
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <div>
          <div className={styles["sidebar-header"]}>
            <span className={styles["sidebar-title"]}>
              <BoxIcon />
              <span>E-Commerce</span>
            </span>
            <button
              className={styles["close-btn"]}
              onClick={handleCloseSidebar}
            >
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
        </div>
        <div className={styles["sidebar-info"]}>
          <div className={styles["sidebar-infoWrapper"]}>
            <img src={userInfo?.profileImageUrl} alt="avatar-user" />
            <div>
              <p>{userInfo?.fullName}</p>
              <p>{userInfo?.jobTitle}</p>
            </div>
          </div>
          <div className={styles["sidebar-icon"]} onClick={handleLogout}>
            <LogOutIcon />
          </div>
        </div>
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
