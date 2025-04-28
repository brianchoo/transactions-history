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
          {showCredentialFields ? (
            <LoginForm
              username={username}
              password={password}
              errorMessage={errorMessage}
              setUsername={setUsername}
              setPassword={setPassword}
              handleLogin={handleLogin}
              closeLoginField={closeLoginField}
            />
          ) : (
            <LoginButtons
              toggleLoginFields={toggleLoginFields}
              handleBiometricAuth={handleBiometricAuth}
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
});

export default LoginScreen;
