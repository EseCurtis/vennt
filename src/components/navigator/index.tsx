import React, { ReactNode, useEffect, useState } from "react";
import { HiMiniHome, HiUserGroup } from "react-icons/hi2";

interface INavItem {
    children: ReactNode;
    route: string;
}

const NavItem: React.FC<INavItem>  = ({ children, route })  => {
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
        <a onClick={() => { location.hash = `#${route}`}} className={`item ${hashValue == route ? "active" : ""}`}>
            {children}
        </a>
    )
}

export default function Navigator () {
    return (
        <div className="app--navigator">
            <NavItem route="home">
                <HiMiniHome/>
                <span>Home</span>
            </NavItem>

            <NavItem route="chat">
                <HiUserGroup/>
                <span>Chat</span>
            </NavItem>
        </div>
    )
}