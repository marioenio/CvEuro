import React from 'react';

interface FormGroupProps {
    title: string;
    children: React.ReactNode;
}

const FormGroup: React.FC<FormGroupProps> = ({ title, children }) => {
    return (
        <div className="p-4 border border-gray-200 rounded-lg">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
            <div className="space-y-4">
                {children}
            </div>
        </div>
    );
};

export default FormGroup;
