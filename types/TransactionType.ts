import { ListRenderItem, RefreshControlProps } from "react-native";

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
  // keyExtractor?: (item: Transaction, index: number) => string;
  // renderItem?: ListRenderItem<Transaction>;
  // refreshControl?: React.ReactElement<RefreshControlProps>;
}

export interface TransactionListItemProps {
  transaction: Transaction;
  masked: boolean;
}
