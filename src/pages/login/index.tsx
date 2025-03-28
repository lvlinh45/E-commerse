import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountAdmin } from "../../constants/accountAdmin";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("Email không hợp lệ").required("Email là bắt buộc"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải có ít nhất 6 ký tự")
    .required("Mật khẩu là bắt buộc"),
});

type FormData = {
  email: string;
  password: string;
};

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [loginError, setLoginError] = useState<string>("");

  const navigate = useNavigate();

  const onSubmit = (data: FormData) => {
    const account = accountAdmin.find(
      (account) =>
        account.email === data.email && account.password === data.password
    );

    if (account) {
      localStorage.setItem("auth", "true");

      Swal.fire({
        title: "Đăng nhập thành công!",
        text: `Chào mừng ${account.fullName}`,
        icon: "success",
        confirmButtonText: "OK",
      }).then(() => {
        navigate("/auth/admin", { state: { userId: account.id } });
      });

      setLoginError("");
    } else {
      setLoginError("Thông tin đăng nhập không chính xác");
    }
  };

  const { t } = useTranslation("loginPage");

  return (
    <div className="login-container">
      <h2>{t("Login")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
        <div className="input-group">
          <label htmlFor="email">{t("Email Address")}</label>
          <input
            type="text"
            {...register("email")}
            autoComplete={"off"}
            id="email"
            name="email"
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="password">{t("Password")}</label>
          <input
            type="password"
            {...register("password")}
            name="password"
            autoComplete="new-password"
            id="password"
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
        </div>

        {loginError && <p className="error-message">{loginError}</p>}

        <button type="submit" className="login-button">
          {t("LOG IN")}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
