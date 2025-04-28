export type TransactionType = "credit" | "debit" | string;
export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
}
export interface TransactionListProps {
  transactions: Transaction[];
  refreshing: boolean;
  masked: boolean;
  error?: string;
  onRefresh: () => Promise<void>;
}
export interface TransactionListItemProps {
  transaction: Transaction;
  masked: boolean;
}

export type TransactionDetailParams = {
  transactionId: number;
  transactionAmount: number;
  transactionDescription: string;
  transactionDate: string;
  transactionType: string;
};
