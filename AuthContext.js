import React, { createContext, useContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [postId, setPostId] = useState(null);

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedToken = await AsyncStorage.getItem("token");
        const storedUser = await AsyncStorage.getItem("user");
        const storedPostId = await AsyncStorage.getItem("postId");

        if (storedToken) {
          setToken(storedToken);
        }
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
        if (storedPostId) {
          setPostId(storedPostId);
        }
      } catch (error) {
        console.log("Error loading stored data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadStoredData();
  }, []);

  const saveToken = async (token) => {
    try {
      setToken(token);
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log("Error saving token:", error);
    }
  };

  const savePostId = async (postId) => {
    try {
      setPostId(postId);
      await AsyncStorage.setItem("postId", postId);
    } catch (error) {
      console.log("Error saving postId:", error);
    }
  };

  const clearToken = async () => {
    try {
      setToken(null);
      setUser(null);
      await AsyncStorage.removeItem("token");
      await AsyncStorage.removeItem("user");
    } catch (error) {
      console.log("Error clearing token:", error);
    }
  };

  const saveUser = async (userData) => {
    try {
      setUser(userData);
      await AsyncStorage.setItem("user", JSON.stringify(userData));
    } catch (error) {
      console.log("Error saving user data:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        saveToken,
        clearToken,
        saveUser,
        loading,
        postId,
        savePostId,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
