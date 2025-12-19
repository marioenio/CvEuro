import React from 'react';

interface Step5Props {
    jobDescription: string;
    setJobDescription: (value: string) => void;
}

const Step5AIOptimization: React.FC<Step5Props> = ({ jobDescription, setJobDescription }) => {
    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Otimização com IA</h2>
            <div>
                <label htmlFor="jobDescription" className="block text-sm font-medium text-gray-700">
                    Copie e cole aqui o texto completo da vaga de emprego que você deseja.
                </label>
                <textarea
                    id="jobDescription"
                    name="jobDescription"
                    rows={10}
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Cole a descrição da vaga aqui..."
                />
                 <p className="mt-2 text-xs text-gray-500">Quanto mais detalhes você fornecer, melhor será a otimização do seu currículo pela IA.</p>
            </div>
        </div>
    );
};

export default Step5AIOptimization;