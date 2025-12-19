import React from 'react';
import { WorkExperienceItem } from '../types';

interface Step2Props {
    headline: string;
    setHeadline: (value: string) => void;
    data: WorkExperienceItem[];
    updateData: (index: number, data: Partial<WorkExperienceItem>) => void;
}

const Step2WorkExperience: React.FC<Step2Props> = ({ headline, setHeadline, data, updateData }) => {
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        updateData(index, { [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Experiência Profissional</h2>
            
            <div className="mb-6">
                <label htmlFor="headline" className="block text-sm font-medium text-gray-700">Título Profissional (Headline)</label>
                <input 
                    type="text" 
                    name="headline" 
                    id="headline" 
                    value={headline} 
                    onChange={(e) => setHeadline(e.target.value)} 
                    placeholder="Ex: Especialista em Marketing | Criador de Conteúdo"
                    className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" 
                />
                <p className="mt-2 text-xs text-gray-500">Um título curto e impactante para o topo do seu currículo.</p>
            </div>

            <div className="space-y-6">
                {data.map((exp, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg">
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Empresa {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor={`company_${index}`} className="block text-sm font-medium text-gray-700">Empresa</label>
                                <input type="text" name="company" id={`company_${index}`} value={exp.company} onChange={(e) => handleChange(index, e)} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor={`period_${index}`} className="block text-sm font-medium text-gray-700">Período</label>
                                <input type="text" name="period" id={`period_${index}`} value={exp.period} onChange={(e) => handleChange(index, e)} placeholder="Ex: Jan 2020 - Dez 2023" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Step2WorkExperience;