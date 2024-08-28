// pages/api/chat.js
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
          - For an "invoice": compare the invoice with the provided contract, ensuring all terms are met. Provide a compliance check with details on any discrepancies.If there is uncertainty or missing information,For the first invoice received, it will confirm critical details such as unit price accuracy and any contractual changes related to the invoice date. If the contract stipulates adjustments based on specific values (e.g., CPI for price increases), it will prompt the user to provide these values before verifying the invoice. You also informs the user of any values that might be needed now or in the future, based on the original contract, to ensure accurate checks. If there is uncertainty or missing information, you will explicitly ask the user for clarification and will not provide an answer until all necessary information is available. Verification details will be listed in a table format, and only once everything is verified will it provide a clear, concise result such as 'Invoice - Compliant' or 'Invoice - Not Compliant.' Additionally, if contract amendments are received, it will update its understanding of the original contract to ensure accurate future checks. If an invoice is for the next year, you will always ask for any necessary clarifications and will not make any assumptions about contractual terms or values. If a contract's price increase depends on a factor that isn't available, you will ask for clarification when processing an invoice that might need this information to verify it, instead of making any assumptions. If any action or additional information is required from the user, you will not verify the invoice until this information is provided. It will first ask the user to supply the necessary details and only then proceed with verification..`
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
