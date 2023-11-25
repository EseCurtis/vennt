import React, { ReactNode, useEffect } from "react";
import { HashRoute } from "../../utils/Screen";

interface IScreen {
  children: ReactNode;
}

const Screens: React.FC<IScreen> = ({ children }) => {
  useEffect(() => {
    if (window.location.hash.length < 1) {
      HashRoute("home");
    }
  }, []);

  return <div className="app--screens">{children}</div>;
};

export default Screens;
