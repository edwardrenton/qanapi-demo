"use server";

interface EncryptDataProps {
  fields: string         // comma-separated string of fields to encrypt
  classification: string // the data-classification
  data: object           // the data to encrypt
}

export async function encryptData(props: EncryptDataProps) {
  const url = process.env.QANAPI_PROXY_URL;
  const apiKey = process.env.QANAPI_API_KEY;

  if (!url || !apiKey) throw new Error("Missing required Qanapi env vars.")

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'X-KBOSS-Authorization': apiKey,
      'x-kboss-mode': 'encrypt',
      'X-KBOSS-Fields': props.fields,
      'X-KBOSS-Classification': props.classification,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(props.data)
  });

  return response.json();
}