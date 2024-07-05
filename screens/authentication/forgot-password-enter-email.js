import { View, Dimensions } from "react-native";
const { height } = Dimensions.get("window");
import LabelWithField from "../../components/label-with-field";
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";

export default function ForgotPasswordEnterEmail({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={"Forgot Password"} />
      <SizedBox height={height * 0.03} />
      <View style={styles.body}>
        <LabelWithField
          label={"User Name or Email"}
          placeholder={"User Name or Email"}
          icon={"envelope"}
        ></LabelWithField>
        <View style={{ flex: 1 }}></View>

        <TextButton
          text={"Reset Password"}
          color={"#0075FD"}
          textColor={"#fff"}
          onPress={() => {
            navigation.navigate("ForgotPasswordEmailSent");
          }}
        ></TextButton>

        <TextButton
          text={"Back To Login"}
          color={"#f2f8fc"}
          textColor={"#33363B"}
          hasBorder={true}
          onPress={() => {
            navigation.navigate("Login");
          }}
        ></TextButton>
      </View>
    </View>
  );
}

const styles = {
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    fontSize: 20,
    fontWeight: "700",
    marginBottom: 10,
  },

  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
};
