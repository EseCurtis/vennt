import { ReactNode } from "react";

interface IButton {
  className?: string;
  children: ReactNode;
  isSecondary?: boolean;
  onClick?: () => void; 
}

interface IButtonSecondary {
    className?: string;
    children: ReactNode;
    onClick?: () => void; 
}

export default function Button({
  className = "",
  children,
  isSecondary = false,
  ...restProps
}: IButton) {
  return isSecondary ? (
    <button
      className={`${className} bg-[var(--bg-secondary)] border border-[var(--bg-secondary-2)] p-3 rounded-lg w-full`}
      {...restProps}
    >
      {children}
    </button>
  ) : (
    <button
      className={`${className} bg-[var(--accent)] p-3 rounded-lg w-full`}
      {...restProps}
    >
      {children}
    </button>
  );
}


export const ButtonSecondary = ({ children, className, ...restProps }: IButtonSecondary) => {
    return (
        <Button isSecondary={true} className={className} children={children} {...restProps}/>
    )
}