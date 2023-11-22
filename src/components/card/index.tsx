import {ReactNode} from "react";

interface ICard {
    children: ReactNode;
}
interface ITitle extends ICard {}
interface IParagraph extends ICard {}

export default function Card({ children } : ICard) {
  return (
    <div className="intro-card relative bg-[var(--bg-secondary)] rounded-lg p-4 border border-[var(--bg-secondary-2)]">
      {children}
    </div>
  );
}

export function Paragraph({ children } : IParagraph) {
    return (
        <p className="intro-text py-4 text-[13px] opacity-70 ">
        {children}
      </p>
    );
  }

  

export function Title({ children }: ITitle) {
    return <h3 className="text-[20px] font-bold">{children}</h3>;
  }