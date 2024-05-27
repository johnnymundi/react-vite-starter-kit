import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/styles";
import { TitleText } from "../../components/TitleText";
import useAuth from "../../hooks/useAuth";
import "../../pages/Login/styles.css";
import { Container } from "./styles";

interface Inputs {
  email: string;
  password: string;
}

export const Login = () => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  //const [newPassword, setNewPassword] = useState<boolean>(false);
  const { signIn, errorLogin, errorReason } = useAuth();
  const [loginError, setLoginError] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (formData) => {
    if (formData) {
      const credentials = {
        email: formData.email.trim(),
        password: formData.password,
      };

      signIn(credentials).then(() => {
        if (errorLogin) {
          if (errorReason.includes("password")) {
            console.log("password incorrect");
            setLoginError(true);

            const timeout = setTimeout(() => {
              setLoginError(false);
            }, 1000);

            return () => clearTimeout(timeout);
          }
        }
      });
    }
  };

  const handleShowPassword = () => setShowPassword(!showPassword);

  return (
    <Container>
      <div className="fomr-container">
        <div style={{ display: "flex", width: "50%" }}>
          <form action="" onSubmit={handleSubmit(onSubmit)}>
            <TitleText level={3} title="" color="#326ebe" />

            <div style={{ display: "flex", flexDirection: "column" }}>
              <label
                style={{
                  marginTop: 15,
                  fontFamily: "'Roboto', sans-serif",
                  fontSize: "16px",
                  lineHeight: "19px",
                  color: "#326ebe",
                  // opacity: '0.8',
                  fontWeight: "bold",
                }}
              >
                <img src={"IconLogin"} alt="login" width={45} />
              </label>
              <input
                type="text"
                placeholder=""
                {...register("email", {
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Endereço de e-mail inválido",
                  },
                })}
                style={{
                  width: "330px",
                  borderRadius: 15,
                  borderStyle: "solid",
                  borderColor: "#326ebe",
                  marginTop: "10px",
                  marginBottom: "15px",
                }}
              />
              {errors.email && (
                <span className="requiredLabel">{errors.email.message}</span>
              )}
            </div>

            <div style={{ display: "flex", flexDirection: "column" }}>
              <div style={{ position: "relative" }}>
                <label
                  style={{
                    marginTop: 5,
                    fontFamily: "'Roboto', sans-serif",
                    fontSize: "16px",
                    lineHeight: "19px",
                    color: "#326ebe",
                    // opacity: '0.8',
                    fontWeight: "bold",
                  }}
                >
                  <div>
                    <img src={"PasswordIcon"} alt="icon-login" width={50} />
                  </div>
                </label>
                <input
                  type={showPassword ? "text" : "password"}
                  className={loginError ? "erro-input" : ""}
                  style={{
                    width: "330px",
                    borderRadius: 15,
                    borderStyle: "solid",
                    borderColor: loginError ? "red" : "#326ebe",
                    marginTop: "10px",
                  }}
                  placeholder=""
                  {...register("password", { required: true })}
                />

                <img
                  src={"EyeIcon"}
                  alt="password-show"
                  className="password-show"
                  onClick={handleShowPassword}
                  style={{ marginLeft: "35px" }}
                />

                {errors.password && (
                  <span className="requiredLabel" style={{ marginLeft: -30 }}>
                    Esse campo é obrigatório
                  </span>
                )}
              </div>
            </div>

            {errorLogin && errorReason.includes("blocked") && (
              <span
                className="requiredLabel"
                style={{ fontWeight: "bold", fontSize: 13, marginLeft: "5px" }}
              >
                Sua conta está bloqueada, contacte o administrador
              </span>
            )}

            {errorLogin && errorReason.includes("expired") && (
              <span
                className="requiredLabel"
                style={{ fontWeight: "bold", fontSize: 13 }}
              >
                Usuário com acesso expirado ou inativo, contacte o administrador
              </span>
            )}

            {/* {errorLogin && errorReason.includes("password") && (
                            <span className={`requiredLabel ${isBlinking ? 'blinking-text' : ''}`} style={{fontWeight:"bold", fontSize:13, marginLeft: '5px'}}>
                                Usuário e/ou senha inválidos. Tentativas restantes: <u style={{fontSize:14}}>{attemptsLeft}</u>
                            </span>
                        )} */}

            <Button
              color="white"
              type="submit"
              style={{
                marginTop: 30,
                width: "50px",
                borderRadius: "30px",
                float: "left",
                marginBottom: "10px",
                marginRight: "5px",
                height: "20px",
              }}
            >
              <img
                src={"ButtonLogin"}
                alt="botão-login"
                style={{
                  marginTop: -10,
                  float: "left",
                  width: "80px",
                  marginLeft: "-5px",
                }}
              />
            </Button>

            <span
              onClick={() => navigate("/recuperar-senha")}
              style={{
                display: "flex",
                justifyContent: "right",
                cursor: "pointer",
                fontFamily: "'Roboto', sans-serif",
                fontSize: "15px",
                lineHeight: "21px",
                color: "#326ebe",
                opacity: "0.85",
                marginTop: "-30px",
                marginRight: "15px",
                marginLeft: "100px",
              }}
            >
              <img
                src={"IconForgetPsw"}
                alt="esqueci-minha-senha"
                width={160}
              />
            </span>
          </form>
        </div>
      </div>
    </Container>
  );
};
