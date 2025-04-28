import React from "react";
import { View, Text, TextInput, StyleSheet, Pressable } from "react-native";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LoginFormProps } from "../../types/LoginTypes";

const LoginForm: React.FC<LoginFormProps> = ({
  username,
  password,
  errorMessage,
  setUsername,
  setPassword,
  handleLogin,
  closeLoginField,
}) => {
  return (
    <View style={styles.loginContainer}>
      <Pressable style={styles.closeButton} onPress={closeLoginField}>
        <AntDesign name="close" size={24} color="black" />
      </Pressable>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
      <Pressable
        style={[
          styles.submitButton,
          (!username || !password) && styles.disabledButton,
        ]}
        onPress={handleLogin}
        disabled={!username || !password}
      >
        <Text style={styles.submitButtonText}>Login</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  loginContainer: {
    backgroundColor: "white",
    borderRadius: 8,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#fafafa",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  submitButton: {
    backgroundColor: "#2e7d32",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 10,
  },
  disabledButton: {
    backgroundColor: "#a5d6a7",
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 16,
  },
  submitButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default LoginForm;
