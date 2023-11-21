import React, { ReactNode, useEffect, useState } from "react";

interface IScreenItem {
    hash: string;
    flags?: string;
    children: ReactNode;
}

const ScreenItem: React.FC<IScreenItem> = ({ hash, flags, children }) => {
    const [hashValue, setHashValue] = useState<string>(window.location.hash.substring(1));

    useEffect(() => {
        const handleHashChange = () => {
            let tempHashValue: any = window.location.hash.substring(1);
            if(tempHashValue.split("")[0] == "/") {
                tempHashValue = tempHashValue.replace("/", "");
            }
            
            setHashValue(tempHashValue);
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <div className={`app--screen ${hashValue === hash ? "--active" : "--inactive"}${hash=="404" ? " --404": ""} ${flags || ""}`}>
            {children}
        </div>
    );
};

export default ScreenItem;
