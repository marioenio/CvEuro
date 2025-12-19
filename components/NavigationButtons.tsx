import React from 'react';

interface NavigationButtonsProps {
    currentStep: number;
    totalSteps: number;
    onPrev: () => void;
    onNext: () => void;
    onGenerate: () => void;
}

const NavigationButtons: React.FC<NavigationButtonsProps> = ({ currentStep, totalSteps, onPrev, onNext, onGenerate }) => {
    return (
        <div className="mt-10 flex justify-between items-center">
            <div>
                {currentStep > 1 && (
                    <button
                        type="button"
                        onClick={onPrev}
                        className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400"
                    >
                        Anterior
                    </button>
                )}
            </div>

            <div>
                {currentStep < totalSteps ? (
                    <button
                        type="button"
                        onClick={onNext}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Próximo
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={onGenerate}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Gerar Currículo
                    </button>
                )}
            </div>
        </div>
    );
};

export default NavigationButtons;