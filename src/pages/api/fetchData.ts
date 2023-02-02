export default function fetchData(prompt: string | undefined) {
  const body = {
    model: "command-xlarge-nightly",
    prompt: `Write 1 name for a startup for the keywords: ${prompt}.`,
    max_token: 10,
    temperature: 0.9,
    k: 0,
    p: 0.75,
    frequency_penalty: 0,
    presence_penalty: 0,
    stop_sequences: [],
    return_likelihoods: "NONE",
  };

  return fetch(`${process.env.NEXT_PUBLIC_API_URL}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`,
      "Content-Type": "application/json",
      CohereVersion: "2022-12-06",
    },
    body: JSON.stringify(body),
  });
}
