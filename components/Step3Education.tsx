import React from 'react';
import { Education } from '../types';

interface Step3Props {
    data: Education[];
    updateData: (index: number, data: Partial<Education>) => void;
    addEducation: () => void;
    removeEducation: (index: number) => void;
}

const Step3Education: React.FC<Step3Props> = ({ data, updateData, addEducation, removeEducation }) => {
    const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        updateData(index, { [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Educação</h2>
            <div className="space-y-6">
                {data.map((edu, index) => (
                    <div key={index} className="p-4 border border-gray-200 rounded-lg relative">
                         {data.length > 1 && (
                             <button type="button" onClick={() => removeEducation(index)} className="absolute top-3 right-3 text-sm text-red-600 hover:text-red-800 font-medium transition-colors">
                                Remover
                            </button>
                        )}
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Formação Acadêmica {index + 1}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="md:col-span-2">
                                <label htmlFor={`degree_${index}`} className="block text-sm font-medium text-gray-700">Formação Acadêmica</label>
                                <input type="text" name="degree" id={`degree_${index}`} value={edu.degree} onChange={(e) => handleChange(index, e)} placeholder="Ex: Bacharelado em Marketing" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor={`university_${index}`} className="block text-sm font-medium text-gray-700">Universidade</label>
                                <input type="text" name="university" id={`university_${index}`} value={edu.university} onChange={(e) => handleChange(index, e)} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                            <div>
                                <label htmlFor={`conclusionYear_${index}`} className="block text-sm font-medium text-gray-700">Ano de Conclusão</label>
                                <input type="text" name="conclusionYear" id={`conclusionYear_${index}`} value={edu.conclusionYear} onChange={(e) => handleChange(index, e)} placeholder="2020" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
             <div className="mt-6">
                <button type="button" onClick={addEducation} className="w-full justify-center inline-flex items-center px-4 py-2 border border-dashed border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    + Adicionar outra formação
                </button>
            </div>
        </div>
    );
};

export default Step3Education;