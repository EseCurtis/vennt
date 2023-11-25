import React, { ReactNode } from 'react';

interface ConditionalRenderProps {
    condition: boolean;
    fallback: ReactNode;
    children: ReactNode;
}

const ConditionalRender: React.FC<ConditionalRenderProps> = ({ condition, fallback, children }) => {
    return condition ? (children as React.ReactElement) : (fallback as React.ReactElement);
};

export default ConditionalRender;
