import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { accountAdmin } from "../../constants/accountAdmin";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email("invalid_email").required("email_required"),
  password: yup
    .string()
    .min(6, "password_min_length")
    .required("password_required"),
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

  useEffect(() => {
    const isAuth = JSON.parse(localStorage.getItem("auth") || "false");
    if (isAuth) {
      navigate("/auth/admin");
    }
  }, [navigate]);
  const onSubmit = (data: FormData) => {
    const account = accountAdmin.find(
      (account) =>
        account.email === data.email && account.password === data.password
    );

    if (account) {
      localStorage.setItem("auth", "true");

      Swal.fire({
        title: t("login_successful"),
        text: `${t("welcome")} ${account.fullName}`,
        icon: "success",
        confirmButtonText: t("ok"),
      }).then(() => {
        navigate("/auth/admin", { state: { userId: account.id } });
      });

      setLoginError("");
    } else {
      setLoginError(t("incorrect_login_info"));
    }
  };

  const { t } = useTranslation("loginPage");

  return (
    <div className="login-container">
      <h2>{t("login")}</h2>
      <form onSubmit={handleSubmit(onSubmit)} autoComplete={"off"}>
        <div className="input-group">
          <label htmlFor="email">{t("email_address")}</label>
          <input
            type="text"
            {...register("email")}
            autoComplete={"off"}
            id="email"
            name="email"
          />
          {errors.email && (
            <p className="error-message">
              {t(errors.email.message || "unknown_error")}
            </p>
          )}
        </div>

        <div className="input-group">
          <label htmlFor="password">{t("password")}</label>
          <input
            type="password"
            {...register("password")}
            name="password"
            autoComplete="new-password"
            id="password"
          />
          {errors.password && (
            <p className="error-message">
              {t(errors.password.message || "unknown_error")}
            </p>
          )}
        </div>

        {loginError && <p className="error-message">{loginError}</p>}

        <button type="submit" className="login-button">
          {t("log_in")}
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
