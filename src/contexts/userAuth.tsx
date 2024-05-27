import { createContext, ReactNode, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { api, applyToken } from "../services/api";

type AuthProviderProps = {
  children: ReactNode;
};

type SignInCredentials = {
  email: string;
  password: string | null;
};

type UpdatePasswordCredentials = {
  password: string;
  confirm_password: string;
};

type RecoveryPasswordCredentials = {
  email: string;
};

type User = {
  id: number;
  profile: string;
  user_type: number;
  is_locked: boolean;
  pseudo_anonymize: boolean;
  companies_name: string;
  limit_lock_days: number;
  name: string;
  cpf: string;
  office: string;
  email: string;
};

type AuthContextData = {
  signIn: (credentials: SignInCredentials) => Promise<boolean>;
  logout(redir: boolean): void;
  updatePassword: (creadentials: UpdatePasswordCredentials) => Promise<boolean>;
  recoveryPassword: (
    credentials: RecoveryPasswordCredentials
  ) => Promise<boolean>;
  errorLogin: boolean;
  errorReason: string;
  isFirstAccess: boolean;
  isAuthenticated: boolean;
  isCommonUser: boolean;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

// export function signOut() {}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("@SismieGEE:token") && !isFirstAccess
  );

  const isCommonUser =
    user &&
    user.profile !== "sinergia" &&
    user.profile !== "admin" &&
    user.profile !== "analyst";

  // && user.profile !== 'analyst'

  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorReason, setErrorReason] = useState<string>("");

  useEffect(
    () => {
      const token = localStorage.getItem("@SismieGEE:token");

      if (token) {
        getMe();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  async function getMe() {
    setErrorLogin(false);

    try {
      const response = await api.get("/login/me");
      const {
        profile,
        companies_name,
        name,
        id,
        cpf,
        office,
        email,
        is_locked,
        limit_lock_days,
        pseudo_anonymize,
        user_type,
      } = response.data;

      setUser({
        profile,
        name,
        companies_name,
        id,
        cpf,
        office,
        email,
        is_locked,
        pseudo_anonymize,
        limit_lock_days,
        user_type,
      });
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);

      setIsAuthenticated(false);

      navigate("/login");
    }
  }

  async function signIn(data: SignInCredentials) {
    try {
      const response = await api.post("/login", data);

      setUser({
        limit_lock_days: response.data.user.limit_lock_days,
        profile: response.data.user.profile,
        is_locked: response.data.user.is_locked,
        pseudo_anonymize: response.data.user.pseudo_anonymize,
        user_type: response.data.user.user_type,
        companies_name: response.data.user.companies_name,
        name: response.data.user.name,
        cpf: response.data.user.cpf,
        office: response.data.user.office,
        email: response.data.user.email,
        id: response.data.user.id,
      });

      setIsFirstAccess(response.data.is_first_login);
      setTokenInLocalStorage(response.data.token);

      if (!response.data.is_first_login) {
        setIsAuthenticated(true);
        setErrorLogin(false);
        navigate("/inventario");
      } else {
        navigate("/nova-senha");
      }
      if (response) {
        setErrorLogin(false);
      }
      return true;
    } catch (error) {
      console.log(error);
      setErrorLogin(true);

      const item: any = error;

      setErrorReason(item.response.data.message);
      return false;
    }
  }

  async function updatePassword(data: UpdatePasswordCredentials) {
    try {
      const response = await api.post("/login/update_password", data);

      if (response) {
        setIsAuthenticated(false);
        setTokenInLocalStorage("");
        navigate("/login");
      }

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async function recoveryPassword(credentials: RecoveryPasswordCredentials) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const response = await api.post("/login/recover_password", credentials);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function setTokenInLocalStorage(token: string) {
    localStorage.setItem("@SismieGEE:token", JSON.stringify(token));
    applyToken("");
  }

  function removeTokenInLocalStorage() {
    localStorage.removeItem("@SismieGEE:token");
  }

  async function logout(redir = true) {
    try {
      await api.post("logout");
      removeTokenInLocalStorage();
      setIsAuthenticated(false);

      if (redir) navigate("/login");
    } catch (error) {
      removeTokenInLocalStorage();
      setIsAuthenticated(false);

      if (redir) navigate("/inventario");
    }
  }

  return (
    <AuthContext.Provider
      value={{
        signIn,
        logout,
        updatePassword,
        recoveryPassword,
        errorLogin,
        errorReason,
        isFirstAccess,
        isAuthenticated,
        user,
        isCommonUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
