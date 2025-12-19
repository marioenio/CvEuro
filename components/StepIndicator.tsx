import React from 'react';

interface StepIndicatorProps {
    currentStep: number;
    totalSteps: number;
}

const StepIndicator: React.FC<StepIndicatorProps> = ({ currentStep, totalSteps }) => {
    const steps = [
        "Dados Pessoais",
        "Experiência",
        "Educação",
        "Adicionais",
        "Otimização IA"
    ];

    return (
        <div className="flex items-center justify-between max-w-2xl mx-auto">
            {steps.map((label, index) => {
                const stepNumber = index + 1;
                const isCompleted = stepNumber < currentStep;
                const isActive = stepNumber === currentStep;

                return (
                    <React.Fragment key={stepNumber}>
                        <div className="flex flex-col items-center text-center">
                            <div
                                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base transition-colors duration-300
                                ${isCompleted ? 'bg-green-500 text-white' : ''}
                                ${isActive ? 'bg-blue-600 text-white' : ''}
                                ${!isCompleted && !isActive ? 'bg-gray-200 text-gray-600' : ''}`}
                            >
                                {isCompleted ? '✓' : stepNumber}
                            </div>
                            <p className={`mt-2 text-xs sm:text-sm font-medium ${isActive ? 'text-blue-600' : 'text-gray-500'}`}>{label}</p>
                        </div>
                        {stepNumber < totalSteps && (
                            <div className={`flex-1 h-1 mx-2 sm:mx-4 rounded
                                ${isCompleted ? 'bg-green-500' : 'bg-gray-200'}`}>
                            </div>
                        )}
                    </React.Fragment>
                );
            })}
        </div>
    );
};

export default StepIndicator;
