import React, { ReactNode } from "react";

interface IScreen {
    children: ReactNode;
}

const Screens: React.FC<IScreen> = ({ children }) => {
    return (
        <div className="app--screens">
            {children}
        </div>
    );
};

export default Screens;
