import React from 'react';
import { PersonalDetails } from '../types';

interface Step1Props {
    data: PersonalDetails;
    updateData: (data: Partial<PersonalDetails>) => void;
    termsAccepted: boolean;
    setTermsAccepted: (accepted: boolean) => void;
    error: string | null;
}

const Step1PersonalDetails: React.FC<Step1Props> = ({ data, updateData, termsAccepted, setTermsAccepted, error }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Dados Pessoais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Primeiro e último nome</label>
                    <input type="text" name="fullName" id="fullName" value={data.fullName} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="cityCountry" className="block text-sm font-medium text-gray-700">Cidade e País</label>
                    <input type="text" name="cityCountry" id="cityCountry" value={data.cityCountry} onChange={handleChange} placeholder="Ex: São Paulo, Brasil" className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
                <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input type="email" name="email" id="email" value={data.email} onChange={handleChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Telefone Europeu</label>
                    <input type="text" name="phone" id="phone" value={data.phone} onChange={handleChange} placeholder="+351..." className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" required />
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">Link do LinkedIn</label>
                    <input type="text" name="linkedin" id="linkedin" value={data.linkedin} onChange={handleChange} placeholder="https://linkedin.com/in/..." className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
            
            {error && (
              <div id="step-1-error" className="text-red-600 font-medium text-sm mt-4">
                  {error}
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center">
                    <input id="terms" name="terms" type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500" />
                    <label htmlFor="terms" className="ml-3 block text-sm font-medium text-gray-700">
                        Eu li e aceito os 
                        <a href="#" id="privacy-link" className="text-blue-600 hover:underline">
                            Termos de Privacidade
                        </a>.
                    </label>
                </div>
            </div>
        </div>
    );
};

export default Step1PersonalDetails;