import React, { ReactNode, useEffect, useState } from "react";

export interface IScreenItem {
    hash: string;
    flags?: string;
    children: ReactNode;
}

const ScreenItem: React.FC<IScreenItem> = ({ hash, flags, children }) => {
    const [hashValue, setHashValue] = useState<string>(window.location.hash.substring(1).toLowerCase());

    useEffect(() => {
        const hideNavOnScreens = ["conversation"];

        const handleHashChange = () => {
            let tempHashValue: any = window.location.hash.substring(1).toLowerCase();
            if(tempHashValue.split("")[0] == "/") {
                tempHashValue = tempHashValue.replace("/", "");
            }

            if(hideNavOnScreens.includes(tempHashValue)) {
                document.body.classList.add("--hide-nav");
            } else {
                document.body.classList.remove("--hide-nav");
            }

            setHashValue(tempHashValue);
        };

        window.addEventListener("hashchange", handleHashChange);

        return () => {
            window.removeEventListener("hashchange", handleHashChange);
        };
    }, []);

    return (
        <div className={`app--screen ${flags !== "--404" ? hashValue === hash ? "--active" : "--inactive" : ""} ${flags || ""}`}>
            {children}
        </div>
    );
};

export default ScreenItem;
