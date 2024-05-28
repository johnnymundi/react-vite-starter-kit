// src/layouts/AuthenticatedLayout.tsx

import React from "react";
import Header from "../../components/Header/index";

interface Props {
  children: React.ReactNode;
}

const AuthenticatedLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Header />
      <main>{children}</main>
    </div>
  );
};

export default AuthenticatedLayout;
