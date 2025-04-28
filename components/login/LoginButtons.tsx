import React from "react";
import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { LoginButtonsProps } from "../../types/LoginTypes";

const BiometricIcon = () =>
  Platform.OS === "ios" ? (
    <MaterialCommunityIcons name="face-recognition" size={24} color="black" />
  ) : (
    <Entypo name="fingerprint" size={24} color="black" />
  );

const LoginButtons: React.FC<LoginButtonsProps> = ({
  toggleLoginFields,
  handleBiometricAuth,
}) => {
  return (
    <View style={styles.inputContainer}>
      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && { backgroundColor: "#f0f0f0" },
        ]}
        onPress={toggleLoginFields}
      >
        <View>
          <Text style={styles.loginButtonText}>Login with Password</Text>
        </View>
      </Pressable>
      <Pressable
        style={({ pressed }) => [
          styles.loginButton,
          pressed && { backgroundColor: "#f0f0f0" },
        ]}
        onPress={handleBiometricAuth}
      >
        <View>
          <BiometricIcon />
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  loginButton: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "black",
    padding: 15,
    marginBottom: 20,
    marginRight: 10,
  },
  loginButtonText: {
    color: "#000",
    fontSize: 16,
  },
});

export default LoginButtons;
