import React, { ReactNode, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

interface IScreenItem {
    hash: string;
    children: ReactNode;
}

const ScreenItem: React.FC<IScreenItem> = ({ hash, children }) => {
    const location = useLocation();
    const [hashValue, setHashValue] = useState<string>(location.hash.substring(1));

    useEffect(() => {
        const handleHashChange = () => {
            setHashValue(location.hash.substring(1));
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, [location]);

    return (
        <div className={`app--screen ${hashValue === hash ? "active" : "in-active"}`}>
            {children}
        </div>
    );
};

export default ScreenItem;
