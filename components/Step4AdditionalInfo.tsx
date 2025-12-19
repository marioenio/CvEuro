import React from 'react';
import { AdditionalInfo } from '../types';

interface Step4Props {
    data: AdditionalInfo;
    updateData: (data: Partial<AdditionalInfo>) => void;
}

const Step4AdditionalInfo: React.FC<Step4Props> = ({ data, updateData }) => {
    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updateData({ [e.target.name]: e.target.checked });
    };

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updateData({ [e.target.name]: e.target.value as AdditionalInfo['preferredShift'] });
    };
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        updateData({ [e.target.name]: e.target.value });
    };

    const CheckboxItem: React.FC<{ name: keyof AdditionalInfo; label: string; checked: boolean; }> = ({ name, label, checked }) => (
        <div className="flex items-center">
            <input id={name} name={name} type="checkbox" checked={checked} onChange={handleCheckboxChange} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
            <label htmlFor={name} className="ml-2 block text-sm text-gray-900">{label}</label>
        </div>
    );

    return (
        <div>
            <h2 className="text-2xl font-semibold mb-6 text-gray-700">Informações Adicionais</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CheckboxItem name="hasEuropeanDrivingLicense" label="Possui carteira de habilitação Europeia?" checked={data.hasEuropeanDrivingLicense} />
                <CheckboxItem name="hasBrazilianDrivingLicense" label="Possui carteira de habilitação Brasileira?" checked={data.hasBrazilianDrivingLicense} />
                <CheckboxItem name="willingToRelocate" label="Está disposto(a) a mudar de cidade?" checked={data.willingToRelocate} />
                <CheckboxItem name="hasOwnTransport" label="Tem transporte próprio para o trabalho?" checked={data.hasOwnTransport} />
                <CheckboxItem name="willingToWorkWeekends" label="Está disposto(a) a trabalhar no final de semana?" checked={data.willingToWorkWeekends} />
                <CheckboxItem name="willingToTravel" label="Está disposto(a) a fazer viagens de trabalho?" checked={data.willingToTravel} />

                <div>
                    <label htmlFor="preferredShift" className="block text-sm font-medium text-gray-700">Qual turno prefere trabalhar?</label>
                    <select id="preferredShift" name="preferredShift" value={data.preferredShift} onChange={handleSelectChange} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500">
                        <option>Manhã</option>
                        <option>Tarde</option>
                        <option>Noite</option>
                        <option>Indiferente</option>
                    </select>
                </div>
                <div className="md:col-span-2">
                    <label htmlFor="otherInfo" className="block text-sm font-medium text-gray-700">Outras informações que julgar relevante (Ex: Cidadania, idiomas)</label>
                    <textarea name="otherInfo" id="otherInfo" value={data.otherInfo} onChange={handleInputChange} rows={3} className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500" />
                </div>
            </div>
        </div>
    );
};

export default Step4AdditionalInfo;