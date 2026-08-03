import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import {
  View,
  Image,
  Text,
  StatusBar,
  KeyboardAvoidingView,
  Alert,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const SignUpScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigation = useNavigation();

  const handleSignUp = async () => {
    // Trim whitespace from inputs
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();
    const trimmedConfirmPassword = confirmPassword.trim();
  
    console.log("Trimmed Email:", trimmedEmail);
    console.log("Trimmed Password:", trimmedPassword);
    console.log("Trimmed Confirm Password:", trimmedConfirmPassword);
  
    // Check if all fields are filled
    if (!trimmedEmail || !trimmedPassword || !trimmedConfirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }
  
    // Check if passwords match
    if (trimmedPassword !== trimmedConfirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }
  
    try {
      console.log("Sending request to server...");
      const response = await fetch("http://10.10.200.201:5000/signup", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: trimmedEmail,
          password: trimmedPassword,
          confirmPassword: trimmedConfirmPassword 
        })
      });
  
      console.log("Received response from server");
  
      if (response.headers.get("Content-Type")?.includes("application/json")) {
        const data = await response.json();
        console.log("Response data:", data);
  
        if (response.ok) {
          try {
            await AsyncStorage.setItem('token', data.token);
            console.log("Token saved:", data.token);
            navigation.replace("Home");  
          } catch (e) {
            console.log("Error storing token:", e);
            Alert.alert("Error", e.message);
          }
        } else {
          Alert.alert("Error", data.error || "Signup failed");
        }
      } else {
        const responseText = await response.text();
        console.log("Unexpected response type:", responseText);
        Alert.alert("Error", "Unexpected server response");
      }
    } catch (error) {
      console.log("Network request failed:", error);
      Alert.alert("Error", "Network request failed");
    }
  };
  

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Image 
        source={require('../assets/undraw_Sign_up_n6im-removebg-preview.png')} 
        style={styles.image}
      />
      <Text style={styles.header}>Create an account</Text>
      <View style={styles.separator} />
      <TextInput
        label='Email'
        mode="outlined"
        value={email}
        style={styles.input}
        theme={{ colors: { primary: "blue" } }}
        onChangeText={setEmail}
      />
      <TextInput
        label='Password'
        mode="outlined"
        secureTextEntry
        value={password}
        style={styles.input}
        theme={{ colors: { primary: "blue" } }}
        onChangeText={setPassword}
      />
      <TextInput
        label='Confirm Password'
        mode="outlined"
        secureTextEntry
        value={confirmPassword}
        style={styles.input}
        theme={{ colors: { primary: "blue" } }}
        onChangeText={setConfirmPassword}
      />
      <Button
        mode="contained"
        style={styles.button}
        onPress={handleSignUp}
      >
        Sign Up
      </Button>
      <View style={styles.linkContainer}>
        <Text
          style={styles.linkText}
          onPress={() => navigation.navigate("LoginScreen")}  
        >
          Already have an account? 
          <Text style={styles.link}> Log in</Text>
        </Text>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  image: {
    width: '100%',  
    height: 200,    
    resizeMode: 'contain',  
    marginTop: 20,  
  },
  header: {
    fontSize: 35,
    marginLeft: 18,
    marginTop: 10,
    color: "#3b3b3b",
  },
  separator: {
    borderBottomColor: "#6C63FF",
    borderBottomWidth: 4,
    borderRadius: 10,
    marginLeft: 20,
    marginRight: 150,
    marginTop: 4
  },
  input: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
  },
  button: {
    marginLeft: 18,
    marginRight: 18,
    marginTop: 18,
    backgroundColor: '#6C63FF'
  },
  linkContainer: {
    alignItems: 'center',
  },
  linkText: {
    fontSize: 18,
    marginLeft: 18,
    marginTop: 20,
    color: 'black',
  },
  link: {
    fontSize: 18,
    color: 'blue',
  }
});

export default SignUpScreen;