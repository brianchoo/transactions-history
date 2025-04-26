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
import { useTransactions } from "../hooks/useTransactions";

const TransactionList: React.FC = () => {
  const {
    transactions,
    loading,
    refreshing,
    error,
    refreshTransactions,
    loadTransactions,
  } = useTransactions();

  useEffect(() => {
    loadTransactions();
  }, []);

  const handleTransactionPress = (transaction: Transaction): void => {
    console.log("Transaction pressed:", transaction);
  };

  // Handle refresh action
  const onRefresh = async () => {
    await refreshTransactions();
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
