"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.reportTransactionStatus = reportTransactionStatus;
const axios_1 = __importDefault(require("axios"));
const SALEOR_API_URL = process.env.SALEOR_API_URL;
const SALEOR_APP_TOKEN = process.env.SALEOR_APP_TOKEN;
async function reportTransactionStatus(orderId, status) {
  const mutation = `mutation Report($id: ID!, $status: TransactionEventTypeEnum!){
    transactionEventReport(id: $id, status: $status){
      errors{ field message }
    }
  }`;
  await axios_1.default.post(
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
