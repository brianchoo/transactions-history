import React, { useEffect, useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import {
  View,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  RefreshControl,
  Pressable,
} from "react-native";
import TransactionListItem from "./TransactionListItem";
import { Transaction } from "../types/TransactionType";
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

  const [masked, setMasked] = useState<boolean>(true);

  const handleTransactionPress = (transaction: Transaction): void => {
    console.log("Transaction pressed:", transaction);
  };

  // Handle refresh action
  const onRefresh = async () => {
    await refreshTransactions();
  };

  const handleMasked = () => {
    console.log("masked clicked");
    setMasked(!masked);
  };

  useEffect(() => {
    loadTransactions();
  }, []);

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
      <Pressable style={styles.maskedIcon} onPress={handleMasked}>
        {masked ? (
          <Entypo name="eye" size={24} color="black" />
        ) : (
          <Feather name="eye-off" size={24} color="black" />
        )}
      </Pressable>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionListItem
            transaction={item}
            masked={masked}
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
  maskedIcon: {
    alignItems: "flex-end",
    padding: 20,
  },
});

export default TransactionList;
