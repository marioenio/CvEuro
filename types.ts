export interface PersonalDetails {
    fullName: string;
    cityCountry: string;
    email: string;
    phone: string;
    linkedin: string;
}

export interface WorkExperienceItem {
    company: string;
    period: string;
}

export interface Education {
    degree: string;
    university: string;
    conclusionYear: string;
}

export interface AdditionalInfo {
    hasEuropeanDrivingLicense: boolean;
    hasBrazilianDrivingLicense: boolean;
    willingToRelocate: boolean;
    preferredShift: 'Manhã' | 'Tarde' | 'Noite' | 'Indiferente';
    otherInfo: string;
    hasOwnTransport: boolean;
    willingToWorkWeekends: boolean;
    willingToTravel: boolean;
}

export interface FormData {
    headline: string;
    personalDetails: PersonalDetails;
    workExperience: WorkExperienceItem[];
    education: Education[];
    additionalInfo: AdditionalInfo;
}

export interface GeneratedCVData {
    summary: string;
    technical_skills: string[];
    work_descriptions: string[];
    additional_information: string[];
}