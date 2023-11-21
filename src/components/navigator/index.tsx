import React, { ReactNode } from "react";

interface INavItem {
    children: ReactNode;
    route: string;
}

const NavItem: React.FC<INavItem>  = ({ children, route })  => {
    return (
        <a href={`#${route}`} className="item">
            {children}
        </a>
    )
}

export default function Navigator () {
    return (
        <div className="app--navigator">
            <NavItem route="home">Home</NavItem>
        </div>
    )
}