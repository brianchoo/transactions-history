import React, { useEffect, useState } from "react";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
} from "react-native";
import TransactionListItem from "./TransactionListItem";
import { Transaction } from "../types/TransactionType";
import transactionsData from "../data/transaction-data.json";

const TransactionList: React.FC = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const simulateApiCall = (): Promise<void> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // chances to fail - 20%
        const isFail = Math.random() < 0.2;
        if (isFail) {
          reject(new Error("Simulated API failure"));
        } else {
          resolve();
        }
      }, 1000);
    });
  };

  const loadTransactions = async (): Promise<void> => {
    try {
      await simulateApiCall();
      setTransactions(transactionsData as Transaction[]);
    } catch (error) {
      console.error("Failed to load transactions:", error);
      setError("Failed to load transactions. Please refresh the page.");
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleTransactionPress = (transaction: Transaction): void => {
    console.log("Transaction pressed:", transaction);
  };

  // Handle refresh action
  const onRefresh = (): void => {
    setRefreshing(true);
    setError("");
    loadTransactions();
    // Test to check if the refresh function is working
    setTimeout(() => {
      setTransactions([
        ...transactions,
        {
          id: transactions.length + 1,
          amount: 9999.0,
          date: "31-04-2025",
          description: "Shopee Loan Payment",
          type: "credit",
        },
      ]);
    }, 1000);
  };

  if (loading) {
    return (
      <View style={styles.centeredContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading transactions...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Transaction History</Text>
      {error && (
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionListItem
            transaction={item}
            onPress={() => handleTransactionPress(item)}
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f5f5f5",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    padding: 16,
    backgroundColor: "#ffffff",
  },
  errorText: {
    color: "red",
  },
  centeredContainer: {
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
});

export default TransactionList;
