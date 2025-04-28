import React, { ReactElement } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Platform,
  Pressable,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { useLogin } from "../hooks/useLogin";

const LoginScreen: React.FC = () => {
  const {
    showCredentialFields,
    username,
    password,
    errorMessage,
    setUsername,
    setPassword,
    handleBiometricAuth,
    handleLogin,
    toggleLoginFields,
    closeLoginField,
  } = useLogin();

  const BiometricIcon = (): ReactElement =>
    Platform.OS === "ios" ? (
      <MaterialCommunityIcons name="face-recognition" size={24} color="black" />
    ) : (
      <Entypo name="fingerprint" size={24} color="black" />
    );

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.loginLabel}>Please Log In</Text>
          {!showCredentialFields && (
            <View style={styles.inputContainer}>
              <Pressable
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && { backgroundColor: "#f0f0f0" },
                ]}
                onPress={toggleLoginFields}
              >
                <View>
                  <Text style={styles.loginButtonText}>
                    Login with Password
                  </Text>
                </View>
              </Pressable>
              <Pressable
                style={({ pressed }) => [
                  styles.loginButton,
                  pressed && { backgroundColor: "#f0f0f0" }, // light grey on press
                ]}
                onPress={handleBiometricAuth}
              >
                <View>
                  <BiometricIcon />
                </View>
              </Pressable>
            </View>
          )}

          {showCredentialFields && (
            <View style={styles.credentialsContainer}>
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
          )}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  loginLabel: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  formContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },
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
  credentialsContainer: {
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

export default LoginScreen;
