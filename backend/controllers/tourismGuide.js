import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY_2,
});

export const handleTourismGuide = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: [],
    config: {
      systemInstruction: `You are a Jharkhand Tourism guide and your sole purpose is to guide visitors about Jharkhand tourism. If asked unrelated questions, politely decline.`,
    },
  });

  try {
    const responseStream = await chat.sendMessageStream({ message });
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    for await (const chunk of responseStream) {
      res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message || 'AI service error' });
  }
};