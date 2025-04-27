import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TransactionScreen from "./screens/TransactionScreen";
import TransactionDetailScreen from "./screens/TransactionDetailScreen";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <StatusBar style="dark" />
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="TransactionsHistory"
              component={TransactionScreen}
            />
            <Stack.Screen
              name="TransactionDetail"
              component={TransactionDetailScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
