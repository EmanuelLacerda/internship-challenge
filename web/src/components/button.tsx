import type { ComponentProps, ReactNode } from "react";
import { EnumTypeText, Text } from "./text";

interface ButtonProps extends ComponentProps<"button"> {
    children: ReactNode;
}

export function Button({children, className, disabled, ...props}: ButtonProps){
    return  <button
        className={`button-element md ${className}`}
        disabled={disabled}
        {...props}
    >
        <Text type={EnumTypeText.largeButton}>{children}</Text>
    </button>
}