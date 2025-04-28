import React from "react";
import { View, FlatList, StyleSheet, RefreshControl } from "react-native";
import TransactionListItem from "../transaction/TransactionListItem";
import { TransactionListProps } from "../../types/TransactionType";

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  refreshing,
  masked,
  onRefresh,
}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={transactions}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TransactionListItem transaction={item} masked={masked} />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={{ paddingBottom: 60 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
});

export default TransactionList;
