
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getZenReflection = async (language: 'ar' | 'en' = 'en'): Promise<{text: string, source: string}> => {
  const prompt = language === 'ar' 
    ? "أعطني حكمة قصيرة جداً أو 'كوان' (Koan) عن السكون والعدم. اجعلها عميقة ومختصرة. المصدر يجب أن يكون 'Zen' أو اسم فيلسوف."
    : "Provide a very short Zen koan or a reflection about stillness and 'doing nothing'. Keep it poetic and brief. The source should be 'Zen' or a philosopher's name.";

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            text: { type: Type.STRING, description: language === 'ar' ? "نص الحكمة أو الكوان." : "The text of the koan or reflection." },
            source: { type: Type.STRING, description: language === 'ar' ? "مصدر الحكمة، مثل 'Zen' أو 'Lao Tzu'." : "The source of the wisdom, e.g., 'Zen' or 'Lao Tzu'." }
          },
          required: ["text", "source"]
        }
      },
    });

    // Trim and parse the JSON response from the .text property
    const jsonString = response.text.trim();
    return JSON.parse(jsonString);
    
  } catch (error) {
    console.error("Error fetching reflection:", error);
    // Provide a fallback koan if the API fails
    return { 
      text: language === 'ar' ? "في السكون، يتحدث كل شيء." : "In stillness, everything speaks.", 
      source: "Zen" 
    };
  }
};
