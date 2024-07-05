import { View, Text, Dimensions, StyleSheet, Image } from "react-native";
const { width, height } = Dimensions.get("window");
import LabelWithField from "../../components/label-with-field";
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";

export default function SignUp({ navigation }) {
  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.01} />
      <Header title={"Create An Account"} />
      <View style={{ alignContent: "center" }}>
        <LabelWithField
          label={"Name"}
          placeholder={"Enter Name"}
          icon={"user"}
        ></LabelWithField>
        <LabelWithField
          label={"Email"}
          placeholder={"Enter Email Address"}
          icon={"envelope"}
        ></LabelWithField>
        <LabelWithField
          label={"Phone No."}
          placeholder={"Enter Phone Number"}
          icon={"phone"}
        ></LabelWithField>
        <LabelWithField
          label={"Password"}
          placeholder={"Enter Password"}
          icon={"lock"}
        ></LabelWithField>
        <SizedBox height={height * 0.05} />
      </View>
      <TextButton
        text={"Create an Account"}
        color={"#0075FD"}
        textColor={"#fff"}
        onPress={() => {
          navigation.navigate("VerifyEmail");
        }}
      ></TextButton>
      <View style={styles.footer}>
        <Text style={{ color: "#8E8E8E", fontSize: 14 }}>
          Already have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ color: "#054BB4", fontSize: 14 }}
        >
          {"  "}
          Login
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

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
});
