import { ReactNode, useEffect } from "react";
import ScreenItem, { IScreenItem } from "./ScreenItem";

interface IScreenItemProtected extends IScreenItem {
  condition: boolean;
  children: ReactNode;
  hash: string;
  fallbackHash: string;
}

export default function ScreenItemProtected({
  condition,
  children,
  hash,
  fallbackHash,
  ...restProps
}: IScreenItemProtected) {
  useEffect(() => {
    const handleHashChange = () => {
      if (!condition && window.location.hash == `#${hash}`) {
        window.location.hash = `#${fallbackHash}`;
      }
    };

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  useEffect(() => {
    if (!condition) {
      window.location.hash = `#${fallbackHash}`;
    }
  }, [condition]);

  return (
    condition && (
      <ScreenItem hash={hash} {...restProps}>
        {children}
      </ScreenItem>
    )
  );
}
