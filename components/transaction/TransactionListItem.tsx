import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Text, StyleSheet, View, Pressable } from "react-native";
import { TransactionListItemProps } from "../../types/TransactionType";

const TransactionListItem: React.FC<TransactionListItemProps> = ({
  transaction,
  masked,
}) => {
  const { amount, date, description, type } = transaction;
  const navigation = useNavigation<any>();

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={() =>
        navigation.navigate("TransactionDetail", {
          transactionId: transaction.id,
          transactionAmount: transaction.amount,
          transactionDescription: transaction.description,
          transactionDate: transaction.date,
          transactionType: transaction.type,
        })
      }
    >
      <View style={styles.transactionInfoContainer}>
        <Text style={styles.dateText}>{date}</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.amountContainer}>
        <Text style={styles.typeText}>{type.toUpperCase()}</Text>
        <Text style={styles.amountText}>
          {masked ? "RM******" : `RM${amount.toFixed(2)}`}
        </Text>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    marginHorizontal: 16,
    marginTop: 12,
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  pressed: {
    opacity: 0.7,
    backgroundColor: "#f0f0f0",
  },
  transactionInfoContainer: {
    maxWidth: "70%",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
    marginBottom: 6,
  },
  descriptionText: {
    fontSize: 16,
    fontWeight: "500",
  },
  amountContainer: {
    alignItems: "flex-end",
    maxWidth: "30%",
  },
  amountText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  typeText: {
    fontSize: 12,
    marginTop: 4,
    marginBottom: 6,
  },
});

export default TransactionListItem;
