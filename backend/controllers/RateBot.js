import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_API_KEY, // keep your key secure
});

export const handleChat = async (req, res) => {
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Message required' });

  const chat = ai.chats.create({
    model: 'gemini-2.5-flash',
    history: [], // you can add conversation history if needed
    config: {
      systemInstruction: `You are a Jharkhand tourism guide. If user asks unrelated questions, politely decline and ask to stick to Jharkhand tourism.`,
    },
  });

  try {
    const responseStream = await chat.sendMessageStream({ message });

    // Set SSE headers for streaming
    res.writeHead(200, {
      'Content-Type': 'text/event-stream',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
    });

    for await (const chunk of responseStream) {
        // console.log("Backend chunk:", chunk);
        res.write(`data: ${JSON.stringify(chunk)}\n\n`);
    }
    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error) {
    res.status(500).json({ error: error.message || 'AI service error' });
  }
};