
import React, { useState } from 'react';
import { FormData, GeneratedCVData, WorkExperienceItem, Education } from './types';
import Header from './components/Header';
import StepIndicator from './components/StepIndicator';
import Step1PersonalDetails from './components/Step1PersonalDetails';
import Step2WorkExperience from './components/Step2WorkExperience';
import Step3Education from './components/Step3Education';
import Step4AdditionalInfo from './components/Step4AdditionalInfo';
import Step5AIOptimization from './components/Step5AIOptimization';
import NavigationButtons from './components/NavigationButtons';
import LoadingSpinner from './components/LoadingSpinner';
import CVDisplay from './components/CVDisplay';
import { generateCVSections } from './services/geminiService';

const App: React.FC = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState<FormData>({
        headline: '',
        personalDetails: {
            fullName: '',
            cityCountry: '',
            email: '',
            phone: '',
            linkedin: ''
        },
        workExperience: [
            { company: '', period: '' },
            { company: '', period: '' },
            { company: '', period: '' }
        ],
        education: [
            {
                degree: '',
                university: '',
                conclusionYear: ''
            }
        ],
        additionalInfo: {
            hasEuropeanDrivingLicense: false,
            hasBrazilianDrivingLicense: false,
            willingToRelocate: false,
            preferredShift: 'Indiferente',
            otherInfo: '',
            hasOwnTransport: false,
            willingToWorkWeekends: false,
            willingToTravel: false
        }
    });
    const [jobDescription, setJobDescription] = useState('');
    const [generatedCV, setGeneratedCV] = useState<GeneratedCVData | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [termsAccepted, setTermsAccepted] = useState(false);
    const [step1Error, setStep1Error] = useState<string | null>(null);

    const totalSteps = 5;

    const sendDataToSheet = (data: FormData) => {
        // AQUI VAI A URL DA "VERSÃO 4" QUE CRIÁMOS
        const sheetUrl = "https://script.google.com/macros/s/AKfycbyPgjFtvZpnuLYuRaD8YnhhgJiOW9wgMgObt9oufvQMpnWoGbU3ni9CeVHEqcfTFu_1PA/exec";

        // Cria o payload específico
        const payload = {
            nome: data.personalDetails.fullName || "",
            email: data.personalDetails.email || "",
            telefone: data.personalDetails.phone || ""
        };

        // NOVO: Converte o payload JSON para o formato x-www-form-urlencoded
        const formData = new URLSearchParams();
        formData.append('nome', payload.nome);
        formData.append('email', payload.email);
        formData.append('telefone', payload.telefone);

        // Envia os dados com o novo formato
        fetch(sheetUrl, {
            method: "POST",
            body: formData, // Envia o novo objeto formData
            headers: {
                "Content-Type": "application/x-www-form-urlencoded" // Define o novo tipo de conteúdo
            },
        })
        .then(response => response.json()) // A *resposta* do script ainda é JSON
        .then(res => {
            if (res.status === "success") {
                console.log("Lead capturado com sucesso. (Método v4)");
            } else {
                console.error("Erro ao capturar lead (do Sheet):", res.message);
            }
        })
        .catch(error => {
            console.error("Erro grave ao enviar dados para o sheet:", error);
        });
    };

    const handleNext = () => {
        if (currentStep === 1) {
            const { fullName, email, phone } = formData.personalDetails;
            const errors = [];
            if (!fullName) errors.push("Nome");
            if (!email) errors.push("Email");
            if (!phone) errors.push("Telefone");

            if (errors.length > 0 || !termsAccepted) {
                let message = '';
                if (errors.length > 0) {
                    message = `Por favor, preencha os seguintes campos obrigatórios: ${errors.join(', ')}.`;
                }
                if (!termsAccepted) {
                    if (message) {
                        message = message.slice(0, -1) + ' e aceite os Termos de Privacidade.';
                    } else {
                        message = 'Por favor, aceite os Termos de Privacidade.';
                    }
                }
                setStep1Error(message);
                return;
            } else {
                setStep1Error(null);
                sendDataToSheet(formData);
            }
        }

        if (currentStep < totalSteps) {
            setCurrentStep(prev => prev + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(prev => prev - 1);
        }
    };

    // FIX: The generic type `K` was too broad (`keyof FormData`), which could lead to an error
    // when spreading `prev[section]`, as not all properties of `FormData` are objects.
    // The generic is now constrained to only the keys that are being updated and are objects.
    const updateFormData = <K extends 'personalDetails' | 'additionalInfo'>(section: K, data: Partial<FormData[K]>) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...prev[section], ...data }
        }));
    };
    
    const setHeadline = (value: string) => {
        setFormData(prev => ({ ...prev, headline: value }));
    };

    const updateWorkExperience = (index: number, data: Partial<WorkExperienceItem>) => {
        const newWorkExperience = [...formData.workExperience];
        newWorkExperience[index] = { ...newWorkExperience[index], ...data };
        setFormData(prev => ({ ...prev, workExperience: newWorkExperience }));
    };

    const updateEducation = (index: number, data: Partial<Education>) => {
        const newEducation = [...formData.education];
        newEducation[index] = { ...newEducation[index], ...data };
        setFormData(prev => ({ ...prev, education: newEducation }));
    };

    const addEducation = () => {
        setFormData(prev => ({
            ...prev,
            education: [...prev.education, { degree: '', university: '', conclusionYear: '' }]
        }));
    };

    const removeEducation = (index: number) => {
        const newEducation = [...formData.education].filter((_, i) => i !== index);
        setFormData(prev => ({ ...prev, education: newEducation }));
    };

    const handleGenerateCV = async () => {
        setIsLoading(true);
        setError(null);
        setGeneratedCV(null);

        try {
            const { headline, ...dataForAI } = formData;
            const result = await generateCVSections(dataForAI, jobDescription);
            setGeneratedCV(result);
            setCurrentStep(totalSteps + 1); // Move to result view
        } catch (err: any) {
            console.error("Error generating CV:", err);
            setError("Ocorreu um erro ao gerar o currículo. Por favor, tente novamente.");
        } finally {
            setIsLoading(false);
        }
    };

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return <Step1PersonalDetails 
                            data={formData.personalDetails} 
                            updateData={(data) => updateFormData('personalDetails', data)}
                            termsAccepted={termsAccepted}
                            setTermsAccepted={setTermsAccepted}
                            error={step1Error}
                        />;
            case 2:
                return <Step2WorkExperience
                            headline={formData.headline}
                            setHeadline={setHeadline}
                            data={formData.workExperience}
                            updateData={updateWorkExperience}
                        />;
            case 3:
                return <Step3Education data={formData.education} updateData={updateEducation} addEducation={addEducation} removeEducation={removeEducation} />;
            case 4:
                return <Step4AdditionalInfo data={formData.additionalInfo} updateData={(data) => updateFormData('additionalInfo', data)} />;
            case 5:
                return <Step5AIOptimization jobDescription={jobDescription} setJobDescription={setJobDescription} />;
            default:
                return null;
        }
    };

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>;
    }
    
    if (generatedCV) {
        return <CVDisplay 
                    personalDetails={formData.personalDetails} 
                    headline={formData.headline}
                    workExperience={formData.workExperience} 
                    education={formData.education} 
                    cvData={generatedCV} 
                />;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-start p-4 sm:p-6 lg:p-8">
            <div className="w-full max-w-3xl mx-auto">
                <Header />
                <div className="bg-white rounded-lg shadow-xl p-6 md:p-10">
                    <StepIndicator currentStep={currentStep} totalSteps={totalSteps} />
                    
                    <div className="mt-8">
                        {renderStepContent()}
                    </div>

                    {error && <p className="text-red-500 text-center mt-4">{error}</p>}

                    <NavigationButtons
                        currentStep={currentStep}
                        totalSteps={totalSteps}
                        onPrev={handlePrev}
                        onNext={handleNext}
                        onGenerate={handleGenerateCV}
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
