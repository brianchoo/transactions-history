import { View, Text, StyleSheet } from "react-native";
import { useRoute, RouteProp } from "@react-navigation/native";
import { TransactionDetailParams } from "../types/TransactionType";

const TransactionDetailScreen: React.FC = () => {
  const route = useRoute<RouteProp<{ params: TransactionDetailParams }>>();
  const {
    transactionId,
    transactionAmount,
    transactionDescription,
    transactionDate,
    transactionType,
  } = route.params || {};

  const transactionDetails = [
    { label: "ID", value: transactionId },
    { label: "Amount", value: `RM${Number(transactionAmount).toFixed(2)}` },
    { label: "Description", value: transactionDescription },
    { label: "Date", value: transactionDate },
    { label: "Type", value: transactionType?.toUpperCase() },
  ];

  return (
    <View style={styles.container}>
      {transactionDetails.map((item, index) => (
        <View key={index} style={styles.item}>
          <Text style={styles.label}>{item.label}</Text>
          <Text style={styles.value}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  label: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#333",
  },
  value: {
    fontSize: 16,
    color: "#666",
    maxWidth: "60%",
    textAlign: "right",
  },
});

export default TransactionDetailScreen;
