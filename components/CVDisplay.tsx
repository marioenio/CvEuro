import React from 'react';
import { PersonalDetails, GeneratedCVData, WorkExperienceItem, Education } from '../types';

interface CVDisplayProps {
    personalDetails: PersonalDetails;
    headline: string;
    workExperience: WorkExperienceItem[];
    education: Education[];
    cvData: GeneratedCVData;
}

const CVSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
        <h2 className="text-xl font-bold text-gray-900 border-b-2 border-gray-300 pb-1 mb-3">
            {title}
        </h2>
        {children}
    </div>
);

const CVDisplay: React.FC<CVDisplayProps> = ({ personalDetails, headline, workExperience, education, cvData }) => {
    
    const getCVasHTML = () => {
        const style = `
            <style>
                body { font-family: 'Montserrat', sans-serif; color: #333; font-size: 12px; }
                ul { list-style-type: disc; }
            </style>
        `;

        const workExperienceHtml = workExperience
            .filter(exp => exp.company)
            .map((exp, index) => `
                <div class="work-item" style="margin-bottom: 1rem; page-break-inside: avoid;">
                    <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: 4px;">
                        <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">${exp.company}</h3>
                        <p class="work-period" style="margin: 0; font-size: 0.9rem; color: #555; font-weight: 500;">${exp.period}</p>
                    </div>
                    <ul style="margin: 0; padding-left: 20px;">
                    ${cvData.work_descriptions[index] ? cvData.work_descriptions[index].split('\n').filter(p => p.trim()).map(p => `<li style="line-height: 1.6; font-size: 1rem;">${p.replace(/^\* ?|- ?/, '')}</li>`).join('') : ''}
                    </ul>
                </div>
            `).join('');

        const educationHtml = education
            .filter(edu => edu.degree)
            .map(edu => `
                <div class="education-item" style="margin-bottom: 0.5rem;">
                    <h3 style="margin: 0; font-size: 1.125rem; font-weight: 600;">${edu.degree}</h3>
                    <p style="margin: 4px 0 0 0; font-size: 1rem;">${edu.university} - ${edu.conclusionYear}</p>
                </div>
            `).join('');

        const cvHtml = `
             <div style="width: 100%; max-width: 21cm; margin: auto; padding: 1.5cm;">
                <header style="text-align: center; margin-bottom: 2rem;">
                    <h1 style="font-size: 2.25rem; font-weight: 800; margin: 0;">${personalDetails.fullName}</h1>
                    ${headline ? `<h2 style="font-size: 1.25rem; font-weight: 600; color: #374151; margin: 4px 0 8px 0;">${headline}</h2>` : ''}
                    <p class="header-info" style="margin-top: 8px; font-size: 1rem; color: #555;">
                        ${personalDetails.cityCountry} | ${personalDetails.email} | ${personalDetails.phone} | <a href="${personalDetails.linkedin}" target="_blank" style="color: #111827; text-decoration: none;">Linkedin</a>
                    </p>
                </header>
                <main>
                    <div style="margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 2px solid #D1D5DB; padding-bottom: 4px; margin-bottom: 12px;">Summary</h2>
                        <p style="font-size: 1rem; line-height: 1.6; margin: 0;">${cvData.summary}</p>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 2px solid #D1D5DB; padding-bottom: 4px; margin-bottom: 12px;">Technical Skills</h2>
                        <ul style="list-style-position: inside; padding-left: 0; columns: 2; -webkit-columns: 2; -moz-columns: 2; font-size: 1rem;">${cvData.technical_skills.map(skill => `<li>${skill}</li>`).join('')}</ul>
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 2px solid #D1D5DB; padding-bottom: 4px; margin-bottom: 12px;">Work Experience</h2>
                        ${workExperienceHtml}
                    </div>
                    <div style="margin-bottom: 1.5rem;">
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 2px solid #D1D5DB; padding-bottom: 4px; margin-bottom: 12px;">Education</h2>
                        ${educationHtml}
                    </div>
                     <div>
                        <h2 style="font-size: 1.25rem; font-weight: 700; color: #111827; border-bottom: 2px solid #D1D5DB; padding-bottom: 4px; margin-bottom: 12px;">Additional Information</h2>
                        <ul style="list-style-position: inside; padding-left: 0; columns: 2; -webkit-columns: 2; -moz-columns: 2; font-size: 1rem;">${cvData.additional_information.map(info => `<li>${info}</li>`).join('')}</ul>
                    </div>
                </main>
            </div>
        `;

        return `
            <!DOCTYPE html>
            <html>
                <head>
                    <title>${personalDetails.fullName} - CV</title>
                    <meta charset="UTF-8">
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
                    ${style}
                </head>
                <body>
                    ${cvHtml}
                </body>
            </html>
        `;
    };

    const handleDownloadDoc = () => {
        const htmlContent = getCVasHTML();
        const source = 'data:application/vnd.ms-word;charset=utf-8,' + encodeURIComponent(htmlContent);
        const fileDownload = document.createElement("a");
        document.body.appendChild(fileDownload);
        fileDownload.href = source;
        fileDownload.download = `${personalDetails.fullName}.doc`;
        fileDownload.click();
        document.body.removeChild(fileDownload);
    };

    const handleGoogleDriveCopy = () => {
        const fullHtmlContent = getCVasHTML();
        const bodyContentMatch = fullHtmlContent.match(/<body[^>]*>([\s\S]*)<\/body>/);
        const htmlContent = bodyContentMatch ? bodyContentMatch[1] : '';

        const finalHtml = `
            <html>
                <head>
                    <title>${personalDetails.fullName} - CV for Google Docs</title>
                    <link rel="preconnect" href="https://fonts.googleapis.com">
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
                    <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;500;600;700;800&display=swap" rel="stylesheet">
                     <style>
                      body { font-family: 'Montserrat', sans-serif; }
                      ul { list-style-type: disc !important; }
                    </style>
                </head>
                <body style="font-family: 'Montserrat', sans-serif;">
                    <div style="padding: 20px; border: 1px solid #ccc; background: #f0f0f0; margin-bottom: 20px; text-align: center; font-family: sans-serif;">
                        <strong>Instruções:</strong> Pressione <strong>Ctrl+A</strong> (ou Cmd+A) para selecionar tudo, depois <strong>Ctrl+C</strong> (ou Cmd+C) para copiar.
                        <br/>
                        Abra um <a href="https://docs.google.com/document/create" target="_blank" rel="noopener noreferrer">novo documento no Google Docs</a> e cole o conteúdo.
                    </div>
                    ${htmlContent}
                </body>
            </html>
        `;
        const blob = new Blob([finalHtml], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        URL.revokeObjectURL(url);
    };
    
    const formatWorkDescription = (description: string) => {
        if (!description) {
            return null;
        }
        const points = description.split('\n').map(p => p.trim()).filter(p => p.length > 0);
        return (
            <ul className="list-disc list-inside space-y-1 mt-1">
                {points.map((point, i) => (
                    <li key={i}>{point.replace(/^\* ?/, '').replace(/^- ?/, '')}</li>
                ))}
            </ul>
        );
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
            <div className="no-print w-full max-w-3xl flex justify-end gap-4 mb-4">
                 <button onClick={handleGoogleDriveCopy} className="px-6 py-2 bg-gray-300 text-gray-800 rounded-lg hover:bg-gray-400">
                    Criar uma cópia do Google Drive
                </button>
                <button onClick={handleDownloadDoc} className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Baixar .DOC (Editável)
                </button>
            </div>
            <div id="cv-container" className="w-full max-w-3xl bg-white rounded-lg shadow-xl p-6 md:p-10 text-gray-800">
                <div id="cv-content-for-download">
                    <header className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold tracking-tight">{personalDetails.fullName}</h1>
                        {headline && <h2 className="text-xl font-semibold text-gray-700 mt-1">{headline}</h2>}
                        <p className="text-md text-gray-600 mt-2">
                            {personalDetails.cityCountry} | {personalDetails.email} | {personalDetails.phone} | <a href={personalDetails.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-800 hover:underline">Linkedin</a>
                        </p>
                    </header>

                    <main>
                        <CVSection title="Summary">
                            <p className="text-base leading-relaxed">{cvData.summary}</p>
                        </CVSection>

                        <CVSection title="Technical Skills">
                            <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                {cvData.technical_skills.map((skill, index) => (
                                    <li key={index} className="text-base">{skill}</li>
                                ))}
                            </ul>
                        </CVSection>
                        
                        <CVSection title="Work Experience">
                       {workExperience.map((exp, index) => (
                           exp.company && (
                            <div key={index} className="mb-4">
                                <div className="flex justify-between items-baseline mb-1">
                                    <h3 className="text-lg font-semibold">{exp.company}</h3>
                                    <p className="text-sm text-gray-600 font-medium">{exp.period}</p>
                               </div>
                               <div className="text-base leading-relaxed">
                                   {formatWorkDescription(cvData.work_descriptions[index])}
                               </div>
                           </div>
                           )
                       ))}
                        </CVSection>
                        
                        <CVSection title="Education">
                            {education.map((edu, index) => (
                                edu.degree && (
                                    <div key={index} className={index > 0 ? "mt-3" : ""}>
                                        <h3 className="text-lg font-semibold">{edu.degree}</h3>
                                        <p className="text-base">{edu.university} - {edu.conclusionYear}</p>
                                    </div>
                                )
                            ))}
                        </CVSection>

                        <CVSection title="Additional Information">
                            <ul className="list-disc list-inside grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1">
                                {cvData.additional_information.map((info, index) => (
                                    <li key={index} className="text-base">{info}</li>
                                ))}
                            </ul>
                        </CVSection>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default CVDisplay;
