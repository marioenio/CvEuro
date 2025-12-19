
import { GoogleGenAI, Type } from "@google/genai";
import { FormData, GeneratedCVData } from '../types';

export const generateCVSections = async (
    formData: Omit<FormData, 'headline'>,
    jobDescription: string
): Promise<GeneratedCVData> => {
    // FIX: Removed unnecessary API_KEY check, as it's assumed to be present in the environment.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    const systemInstruction = `You are an expert HR recruiter and CV writer specializing in the European job market. A Brazilian candidate has provided their personal info, job history, education, and other details, along with a specific job description they are targeting. Your task is to generate four key sections for their CV, entirely in British English. Note that 'education' and 'workExperience' are arrays.

'Summary': Generate a professional summary that is simple, direct, and powerful, with a maximum of 4-5 sentences (that should fit in 6 lines). This summary should focus on aligning the candidate's profile directly with the keywords from the job description.
'Technical Skills': List a maximum of 8 (eight) technical skills. Prioritize skills that are mentioned in the 'jobDescription' and that can be reasonably inferred from the candidate's info.
'Work Descriptions': For each job in the 'workExperience' array, generate at least 3 (three) detailed bullet points. Maintain the strategic rules: start with action verbs, focus on achievements, quantify results, and use keywords from the job description. The final array must have the same number of items as the input 'workExperience' array.
'Additional Information': A bulleted list summarizing the candidate's availability and preferences, in English. Only include information for items that are marked as true or have a provided value (like 'preferredShift' if it's not 'Indiferente', or 'otherInfo'). Omit items that are false or empty. Use professional phrasing (e.g., 'Willing to relocate', 'Available to travel for work').

Your output must be structured as a JSON object with keys: summary, technical_skills (as an array of strings), work_descriptions (as an array of strings, one for each job), and additional_information (as an array of strings).`;

    const userPrompt = `User Data: ${JSON.stringify(formData)}. Job Description: ${jobDescription}. Generate the CV sections in British English.`;

    const responseSchema = {
        type: Type.OBJECT,
        properties: {
            summary: { type: Type.STRING },
            technical_skills: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            work_descriptions: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            },
            additional_information: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
            }
        },
        required: ['summary', 'technical_skills', 'work_descriptions', 'additional_information']
    };

    try {
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: userPrompt,
            config: {
                systemInstruction: systemInstruction,
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const text = response.text.trim();
        const parsedJson = JSON.parse(text);

        if (!parsedJson.summary || !Array.isArray(parsedJson.technical_skills) || !Array.isArray(parsedJson.work_descriptions) || !Array.isArray(parsedJson.additional_information)) {
            throw new Error("Invalid JSON structure received from API.");
        }
        
        return parsedJson as GeneratedCVData;

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        throw new Error("Failed to generate CV from Gemini API.");
    }
};
