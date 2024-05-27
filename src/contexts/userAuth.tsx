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
  //const [isFirstAccess, setIsFirstAccess] = useState<boolean>(false);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
    !!localStorage.getItem("@Ogvcolor:token")
  );

  // && user.profile !== 'analyst'

  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorReason, setErrorReason] = useState<string>("");

  /*   useEffect(
    () => {
      const token = localStorage.getItem("@Ogvcolor:token");

      if (token) {
        getMe();
      }
    }, // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  ); */

  /* async function getMe() {
    setErrorLogin(false);

    try {
      const response = await api.get("/login/me");

      setUser(response.data);
      setIsAuthenticated(true);
    } catch (error) {
      console.log(error);

      setIsAuthenticated(false);

      navigate("/login");
    }
  } */

  async function signIn(data: SignInCredentials) {
    try {
      const response = await api.post("/auth/login/", data);

      const { token, user } = response.data.data;

      setUser(user);

      //setIsFirstAccess(response.data.is_first_login);
      setTokenInLocalStorage(token);
      setIsAuthenticated(true);

      /* if (!response.data.is_first_login) {
        setIsAuthenticated(true);
        setErrorLogin(false);
        navigate("/inventario");
      } else {
        navigate("/nova-senha");
      } */
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
    console.log("setTokenInLocalStorage", token);
    localStorage.setItem("@Ogvcolor:token", JSON.stringify(token));
    applyToken("");
  }

  function removeTokenInLocalStorage() {
    localStorage.removeItem("@Ogvcolor:token");
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
        isAuthenticated,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
