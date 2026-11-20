
import { GoogleGenAI } from "@google/genai";
import { SiteData } from "../types";

/**
 * Service to handle communication with Google Gemini API.
 * Follows the latest @google/genai SDK standards.
 */
export const getGeminiResponse = async (userPrompt: string, siteData: SiteData) => {
  // Use the API key directly from process.env as per guidelines.
  // Initialization is done right before use to ensure the most up-to-date configuration.
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    const context = `
      Anda adalah "Aurum Concierge", asisten ahli dari perusahaan mewah ${siteData.companyName}.
      
      PENGETAHUAN PERUSAHAAN:
      - Deskripsi: ${siteData.description}
      - Produk: ${siteData.products.map(p => `${p.name} (${p.material}) harga sekitar ${p.price}`).join(', ')}
      - Kontak WhatsApp: ${siteData.contact.whatsapp}
      - Lokasi Workshop: ${siteData.contact.address}

      KEPRIBADIAN:
      - Elegan, Berwibawa, dan Sangat Membantu.
      - Gunakan istilah seperti "Artifact", "Mastery", "Legacy", "Alchemy".
      
      TUGAS UTAMA:
      1. Menjawab pertanyaan teknis tentang tembaga/kuningan.
      2. Mengarahkan calon pembeli ke WhatsApp untuk konsultasi desain kustom.
      3. Memberikan poin-poin jika menjelaskan spesifikasi produk.
      4. Jika ditanya stok, informasikan bahwa kami adalah workshop kustom, sehingga sebagian besar barang dibuat berdasarkan pesanan (Bespoke).

      Jawablah dengan bahasa Indonesia yang sangat sopan dan profesional.
    `;

    // Using gemini-3-flash-preview for basic text task as per model selection guidelines.
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
      config: {
        systemInstruction: context,
        temperature: 0.6,
        topP: 0.9,
      },
    });

    // Accessing response.text property directly as per latest SDK guidelines.
    return response.text || "Saya memahami pertanyaan Anda. Mari kita diskusikan lebih lanjut melalui WhatsApp concierge kami.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Terjadi sedikit gangguan pada koneksi data. Namun, tim pengrajin kami siap membantu Anda secara langsung via WhatsApp.";
  }
};
