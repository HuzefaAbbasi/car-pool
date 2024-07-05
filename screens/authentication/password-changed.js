import { View, Image } from "react-native";
import TextButton from "../../components/text-button";

export default function PasswordChanged({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.upper}>
        <Image
          source={require("../../assets/password-changed.png")}
          style={{ width: 288, height: 148 }}
        ></Image>
      </View>
      <TextButton
        text={"Go Back to Login Page"}
        color={"#0075FD"}
        textColor={"#fff"}
        onPress={() => {
          navigation.navigate("Login");
        }}
      ></TextButton>
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    padding: 16,
  },
  upper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
};
