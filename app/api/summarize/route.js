import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export async function POST(request) {
  try {
    const { text, type = "contract" } = await request.json();

    if (!text) {
      return new Response(
        JSON.stringify({ error: 'Text is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: `You are an AI assistant for managing contractors and vendors in enterprises. Your task varies based on the document type: 
          - For a "contract": summarize the contract and highlight key terms.
          - For an "invoice": compare the invoice with the provided contract, ensuring all terms are met. Provide a compliance check with details on any discrepancies.`
        },
        {
          role: 'user',
          content: `Document type: ${type}. Text: ${text}`
        }
      ],
      temperature: 0.1,
      top_p: 0.9
    });

    const message = completion.choices[0]?.message?.content || 'No response generated';

    return new Response(
      JSON.stringify({ message }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error in API handler:', error);
    return new Response(
      JSON.stringify({ error: error.message || 'Internal Server Error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
