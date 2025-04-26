import { useState, useCallback } from "react";
import { Transaction } from "../types/TransactionType";
import { fetchTransactions } from "../services/transactionService";
import transactionsData from "../data/transaction-data.json";

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTransactions = useCallback(async () => {
    try {
      setError(null);
      await fetchTransactions();
      setTransactions(transactionsData);
      return true;
    } catch (err: any) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const refreshTransactions = useCallback(async () => {
    setRefreshing(true);
    return loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    loading,
    refreshing,
    error,
    refreshTransactions,
    loadTransactions,
  };
};
