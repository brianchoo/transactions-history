import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Keyboard,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useLogin } from "../hooks/useLogin";
import LoginForm from "../components/login/LoginForm";
import LoginButtons from "../components/login/LoginButtons";

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

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formContainer}>
          <Text style={styles.loginLabel}>Please Log In</Text>
          {!showCredentialFields && (
            <LoginButtons
              toggleLoginFields={toggleLoginFields}
              handleBiometricAuth={handleBiometricAuth}
            />
          )}

          {showCredentialFields && (
            <LoginForm
              username={username}
              password={password}
              errorMessage={errorMessage}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              closeLoginField={closeLoginField}
            />
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
