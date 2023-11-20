import React, { ReactNode } from "react";

interface IScreenItem {
    children: ReactNode;
}

const ScreenItem: React.FC<IScreenItem> = ({ hash, children }) => {
    const hashValue; ///put hash value
    return (
        <div className={`app--screen ${hashValue == hash}`}>
            {children}
        </div>
    );
};

export default Screens;
