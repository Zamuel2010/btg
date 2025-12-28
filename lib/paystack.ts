import axios from "axios";

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

if (!PAYSTACK_SECRET) {
  console.warn("PAYSTACK_SECRET_KEY not set; Paystack endpoints will fail.");
}

export async function createPaystackTransaction(email: string, amountKobo: number, metadata?: Record<string, any>) {
  const body = {
    email,
    amount: amountKobo,
    metadata
  };
  const res = await axios.post(
    "https://api.paystack.co/transaction/initialize",
    body,
    {
      headers: {
        Authorization: `Bearer ${PAYSTACK_SECRET}`
      }
    }
  );
  return res.data;
}

export async function verifyPaystackTransaction(reference: string) {
  const res = await axios.get(`https://api.paystack.co/transaction/verify/${reference}`, {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET}`
    }
  });
  return res.data;
}
