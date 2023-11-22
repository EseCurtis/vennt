import React, { ReactNode, useEffect } from "react";

interface IScreen {
  children: ReactNode;
}

const Screens: React.FC<IScreen> = ({ children }) => {
  useEffect(() => {
    if (window.location.hash.length < 1) {
      window.location.hash = "#home";
    }
  }, []);

  return <div className="app--screens">{children}</div>;
};

export default Screens;
