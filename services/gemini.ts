
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getZenReflection = async (language: 'ar' | 'en' = 'en') => {
  const prompt = language === 'ar' 
    ? "أعطني حكمة قصيرة جداً أو 'كوان' (Koan) عن السكون والعدم. اجعلها عميقة ومختصرة."
    : "Provide a very short Zen koan or a reflection about stillness and 'doing nothing'. Keep it poetic and brief.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        systemInstruction: "You are a Zen master. Your words are sparse, profound, and focused on the beauty of silence and inactivity.",
        temperature: 0.8,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING },
            source: { type: Type.STRING }
          },
          required: ["text", "source"]
        }
      },
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Error fetching reflection:", error);
    return { 
      text: language === 'ar' ? "في السكون، يتحدث كل شيء." : "In stillness, everything speaks.", 
      source: "Zen" 
    };
  }
};
