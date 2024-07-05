import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
const { height } = Dimensions.get("window");
import LabelWithField from "../../components/label-with-field";
import SizedBox from "../../components/sizedbox";
import TextButton from "../../components/text-button";
import Header from "../../components/header";

export default function Login({ navigation }) {
  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.06} />
      <Header title={"Login"} />
      <SizedBox height={height * 0.02} />
      <View style={{ alignContent: "center" }}>
        <LabelWithField
          label={"Email or Phone No."}
          placeholder={"Enter Email or Phone No"}
          icon={"envelope"}
        ></LabelWithField>

        <LabelWithField
          label={"Password"}
          placeholder={"Enter Password"}
          icon={"lock"}
        ></LabelWithField>
        <Text
          onPress={() => {
            navigation.navigate("ForgotPasswordEnterEmail");
          }}
          style={styles.forgotPassword}
        >
          Forgot Password?
        </Text>
        <SizedBox height={height * 0.05} />
      </View>
      <TextButton
        text={"Login"}
        color={"#0075FD"}
        textColor={"#fff"}
        onPress={() => {
          navigation.replace("BottomNavigation");
        }}
      ></TextButton>
      <View style={styles.footer}>
        <Text style={{ color: "#8E8E8E", fontSize: 14 }}>
          Don't have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{ color: "#054BB4", fontSize: 14 }}
        >
          {"  "}
          SignUp
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },

  forgotPassword: {
    textAlign: "right",
    textDecorationLine: "underline",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
});
