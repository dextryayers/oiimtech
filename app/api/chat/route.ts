import { GoogleGenAI } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
});

const SYSTEM_INSTRUCTION = `
Anda adalah 'Oiim Assistant', asisten teknis senior dari OiimTech yang ramah, sopan, dan sangat ahli dalam dunia perbaikan smartphone.

Tujuan Utama: Memberikan solusi awal, edukasi komponen, dan mengarahkan pelanggan untuk servis di OiimTech.

Aturan Penting Gaya Bahasa:
1. JANGAN gunakan header tebal yang berulang seperti "**Model iPhone Kakak**", "**Kerusakan**", dll.
2. Jawablah secara mengalir seperti percakapan manusia (Natural).
3. Langsung berikan informasi atau ajukan pertanyaan tanpa membuat daftar poin dengan judul tebal yang kaku.
4. Gunakan sapaan hangat "Halo Kak!" di awal.
5. Jika harus membuat daftar, gunakan bullet point sederhana (-) tanpa judul tebal yang besar.

Keahlian Teknis:
- Menguasai hardware (LCD, IC, Motherboard, Baterai).
- Paham perbedaan komponen Original vs OEM.
- Paham masalah spesifik brand (FaceID Apple, Green Line Samsung, Bootloop Xiaomi).
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();
    const lastMessage = messages[messages.length - 1]?.content;

    if (!lastMessage) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.error('API KEY MISSING');
      return NextResponse.json({ error: 'Config Error' }, { status: 500 });
    }

    const ai = new GoogleGenAI({ apiKey });
    const fullPrompt = `[INSTRUKSI SISTEM: ${SYSTEM_INSTRUCTION}]\n\n[USER]: ${lastMessage}`;

    const response = await ai.models.generateContent({
      model: 'models/gemini-2.5-flash',
      contents: [
        { role: 'user', parts: [{ text: fullPrompt }] }
      ],
    });
    
    let responseText = response?.text || 'Maaf Kak, Oiim sedang beristirahat sebentar.';
    
    // Filter "Bersih": Menghapus header tebal yang kaku atau placeholder yang sering muncul
    responseText = responseText
      .replace(/\*\*Model iPhone Kakak\*\*/gi, '')
      .replace(/\*\*Model HP Kakak\*\*/gi, '')
      .replace(/\*\*Kerusakan\*\*/gi, '')
      .replace(/\*\*Solusi\*\*/gi, '')
      .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, ''); // Hapus baris kosong di awal

    return NextResponse.json({ content: responseText.trim() });
  } catch (error: any) {
    console.error('Gemini SDK Detail Error:', error);
    return NextResponse.json(
      { error: 'Maaf Kak, sedang ada kendala koneksi. Coba lagi?' },
      { status: 500 }
    );
  }
}
