export type TransactionType = "credit" | "debit" | string;

export interface Transaction {
  id: number;
  amount: number;
  date: string;
  description: string;
  type: TransactionType;
}

export interface TransactionListItemProps {
  transaction: Transaction;
  masked: boolean;
  onPress: () => void;
}
