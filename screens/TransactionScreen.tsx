import React, { useEffect, useState, useContext } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import {
  View,
  Text,
  StyleSheet,
  ActivityIndicator,
  Pressable,
} from "react-native";
import TransactionList from "../components/TransactionList";
import { useTransactions } from "../hooks/useTransactions";
import { MaskedContext } from "../context/masked-context";

const TransactionScreen: React.FC = () => {
  const { masked, toggleMasked } = useContext(MaskedContext);
  const {
    transactions,
    loading,
    refreshing,
    error,
    refreshTransactions,
    loadTransactions,
  } = useTransactions();

  // Handle refresh action
  const onRefresh = async () => {
    await refreshTransactions();
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
      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Error: {error}</Text>
        </View>
      )}
      <Pressable style={styles.maskedIcon} onPress={toggleMasked}>
        {masked ? (
          <Entypo name="eye" size={24} color="black" />
        ) : (
          <Feather name="eye-off" size={24} color="black" />
        )}
      </Pressable>
      <TransactionList
        transactions={transactions}
        refreshing={refreshing}
        masked={masked}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  errorContainer: {
    padding: 20,
  },
  centeredContainer: {
    flex: 1,
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

export default TransactionScreen;
