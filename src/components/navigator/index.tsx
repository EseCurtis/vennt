import React, { ReactNode, useEffect, useState, useRef } from "react";
import {
  HiCog6Tooth,
  HiMiniHome
} from "react-icons/hi2";

interface INavItem {
  children: ReactNode;
  route: string;
}

const NavItem: React.FC<INavItem> = ({ children, route }) => {
  const [hashValue, setHashValue] = useState<string>(
    window.location.hash.substring(1)
  );

  useEffect(() => {
    const handleHashChange = () => {
      let tempHashValue: any = window.location.hash.substring(1);
      if (tempHashValue.split("")[0] == "/") {
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
    <a
      onClick={() => {
        location.hash = `#${route}`;
      }}
      className={`item ${hashValue == route ? "active" : ""}`}
    >
      {children}
    </a>
  );
};

export default function Navigator() {
  const navRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (navRef) {
      const navHeight = navRef.current!.offsetHeight;

      const appScreensElements: NodeListOf<HTMLDivElement> =
        document.querySelectorAll(".app--screen");

      if (appScreensElements) {
        for (const element of appScreensElements) {
          element.style.paddingBottom = `${navHeight}px`;
        }
      }
    }
  }, []);

  return (
    <div ref={navRef} className="app--navigator">
      <NavItem route="home">
        <HiMiniHome />
        <span>Home</span>
      </NavItem>

      <NavItem route="settings">
        <HiCog6Tooth />
        <span>Settings</span>
      </NavItem>

      {/* <NavItem route="conversation">
        <HiChatBubbleLeftEllipsis />
        <span>Conversation</span>
      </NavItem> */}
    </div>
  );
}
