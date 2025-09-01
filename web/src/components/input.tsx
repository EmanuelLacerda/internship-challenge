import type { ComponentProps } from "react";
import { EnumTypeText, Text } from "./text";

interface InputProps extends ComponentProps<"input"> {
    label?: string;
    errorMessage?: string;
}

export function Input({label, className, errorMessage, ...props}: InputProps){
    return <div className="input-field-container">
        {label && <Text className="label" type={EnumTypeText.label}>{label}</Text>}
        <input
            className={`element md ${className}`}
            {...props}
        />
        <div className="error-message-container">
            {errorMessage && <Text type={EnumTypeText.errorFeedbackRegular}>{`${errorMessage}`}</Text>}
        </div>
    </div>
}