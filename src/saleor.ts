import axios from "axios";

const SALEOR_API_URL = process.env.SALEOR_API_URL!;
const SALEOR_APP_TOKEN = process.env.SALEOR_APP_TOKEN!;

export async function reportTransactionStatus(
  orderId: string,
  status: "SUCCESS" | "FAILED",
) {
  const mutation = `mutation Report($id: ID!, $status: TransactionEventTypeEnum!){
    transactionEventReport(id: $id, status: $status){
      errors{ field message }
    }
  }`;

  await axios.post(
    SALEOR_API_URL,
    {
      query: mutation,
      variables: { id: orderId, status },
    },
    {
      headers: { Authorization: `Bearer ${SALEOR_APP_TOKEN}` },
    },
  );
}
