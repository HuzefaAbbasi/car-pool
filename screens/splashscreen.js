import { Image, StyleSheet, View } from "react-native";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

export default function SplashScreen({ navigation }) {
  const { token, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (token) {
        navigation.replace("BottomNavigation");
      } else {
        navigation.replace("Login");
      }
    }
  }, [loading, token]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/carpool-logo.png")} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
