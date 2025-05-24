export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { question } = req.body;
  const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: `Answer this kid's question in a fun, simple way: ${question}` }],
      max_tokens: 150,
    })
  });

  const data = await response.json();
  const answer = data.choices?.[0]?.message?.content || "Hmm... I’m not sure about that yet!";
  res.status(200).json({ answer });
}
