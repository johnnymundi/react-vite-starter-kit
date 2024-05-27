import { useContext } from "react";

import { AuthContext } from "../contexts/userAuth";

const useAuth = () => {
  const auth = useContext(AuthContext);
  return auth;
};

export default useAuth;
