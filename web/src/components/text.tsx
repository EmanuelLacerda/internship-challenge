import {type ElementType, type ReactNode, type JSX, createElement, type ComponentProps } from "react";

interface TextProps extends ComponentProps<"p"> {
    as?: keyof JSX.IntrinsicElements;
    type?: EnumTypeText;
    children: ReactNode;
    className?: string;
    disabled?: boolean
}

export enum EnumTypeText {
    heading = 'heading',
    body1regular = 'body1regular',
    body1bold = 'body1bold',
    body2Regular = 'body2Regular',
    body2semibold = 'body2semibold',
    body2bold = 'body2bold',
    smallRegular = 'smallRegular',
    smallBold = 'smallBold',
    largeButton = 'largeButton',
    smallButton = 'smallButton',
    caption = 'caption',
    label = 'label',
    
    errorFeedbackRegular = 'errorTextFeedback errorTextFeedbackRegular',
    errorFeedbackSemibold = 'errorTextFeedback errorTextFeedbackSemibold',
    errorFeedbackBold = 'errorTextFeedback errorTextFeedbackBold',
    successFeedbackRegular = 'successTextFeedback successTextFeedbackRegular',
    successFeedbackSemibold = 'successTextFeedback successTextFeedbackSemibold',
    successFeedbackBold = 'successTextFeedback successTextFeedbackBold',
    informativeFeedbackRegular = 'informativeTextFeedback informativeTextFeedbackRegular',
    informativeFeedbackSemibold = 'informativeTextFeedback informativeTextFeedbackSemibold',
    informativeFeedbackBold = 'informativeTextFeedback informativeTextFeedbackBold',
}

const tagMap: Record<EnumTypeText, ElementType> = {
    [EnumTypeText.heading]: 'h1',

    [EnumTypeText.body1regular]: 'p',
    [EnumTypeText.body1bold]: 'p',
    [EnumTypeText.body2Regular]: 'p',
    [EnumTypeText.body2semibold]: 'p',
    [EnumTypeText.body2bold]: 'p',

    [EnumTypeText.smallRegular]: 'small',
    [EnumTypeText.smallBold]: 'small',

    [EnumTypeText.largeButton]: 'span',
    [EnumTypeText.smallButton]: 'span',

    [EnumTypeText.caption]: 'small',
    [EnumTypeText.label]: 'span',

    [EnumTypeText.errorFeedbackRegular]: 'span',
    [EnumTypeText.errorFeedbackSemibold]: 'span',
    [EnumTypeText.errorFeedbackBold]: 'span',
    [EnumTypeText.successFeedbackRegular]: 'span',
    [EnumTypeText.successFeedbackSemibold]: 'span',
    [EnumTypeText.successFeedbackBold]: 'span',
    [EnumTypeText.informativeFeedbackRegular]: 'span',
    [EnumTypeText.informativeFeedbackSemibold]: 'span',
    [EnumTypeText.informativeFeedbackBold]: 'span',
};

function resolveTag(size: undefined|EnumTypeText): ElementType {
    return size ? tagMap[size] || 'p' : 'p';
}



export function Text({as, type, className, children, disabled, ...props}: TextProps) {
    const baseClasses = `text-element ${type} ${className} ${disabled ? "disabled" : ""}`

    if(as){
        return createElement(
            as,
            {
                className: `${baseClasses}`,
                ...props
            },
            children
        ) 
    }

    const Component = resolveTag(type);
    return (
        <Component
            className={`${baseClasses}`}
            {...props}
        >
            {children}
        </Component>
    )
}