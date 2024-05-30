import { createContext, ReactNode, useState } from "react";
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

// This kind interface type data is derived from Django API response
// I verified that, transforming to camelcase takes some time, depending on the type of data
// So, I choose to keep the snake case of Django.
type User = {
  id: string;
  username: string;
  email: string;
  first_name: string | null;
  is_active: boolean;
  is_staff: boolean;
  is_superuser: boolean;
  last_login: string;
  last_name: string | null;
  created_at: string;
  updated_at: string;
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
  isAuthenticated: boolean;
  user: User;
};

export const AuthContext = createContext({} as AuthContextData);

// export function signOut() {}

export function AuthProvider({ children }: AuthProviderProps) {
  const navigate = useNavigate();
  const [user, setUser] = useState<User>({} as User);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("@SomeBullshitName:token")
  );

  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorReason, setErrorReason] = useState<string>("");

  async function signIn(data: SignInCredentials) {
    try {
      const response = await api.post("/auth/login/", data);

      const { token, user } = response.data.data;

      setUser(user);
      setTokenInLocalStorage(token);
      setIsAuthenticated(true);

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
      const response = await api.post("auth/login/update_password", data);

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
      await api.post("auth/login/recover_password", credentials);

      return true;
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  function setTokenInLocalStorage(token: string) {
    localStorage.setItem("@SomeBullshitName:token", JSON.stringify(token));
    applyToken(token);
  }

  function removeTokenInLocalStorage() {
    localStorage.removeItem("@SomeBullshitName:token");
    applyToken(); // required for subsequently login after a login (otherwise the later token will be applied in the request)
  }

  async function logout(redir = true) {
    try {
      await api.post("auth/logout");
      removeTokenInLocalStorage();
      setIsAuthenticated(false);

      if (redir) navigate("/login");
    } catch (error) {
      removeTokenInLocalStorage();
      setIsAuthenticated(false);
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
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
