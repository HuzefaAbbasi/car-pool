import { View, Text, Dimensions, Image, TouchableOpacity } from "react-native";
const { height } = Dimensions.get("window");
import LabelWithField from "../../components/label-with-field";
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";

export default function ChangePassword({ navigation }) {
  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.06} />
      <Header
        title={"Forgot Password"}
        text={
          "New password must be differenet from your previous used passwords."
        }
      />
      <View style={styles.body}>
        <SizedBox height={height * 0.03} />
        <LabelWithField
          label={"New Password"}
          placeholder={"Enter New Password"}
          icon={"lock"}
        ></LabelWithField>
        <LabelWithField
          label={"Confirm New Password"}
          placeholder={"Enter Confirm New Password"}
          icon={"lock"}
        ></LabelWithField>
        <View style={{ flex: 1 }}></View>

        <TextButton
          text={"Reset Password"}
          color={"#0075FD"}
          textColor={"#fff"}
          onPress={() => {
            navigation.navigate("PasswordChanged");
          }}
        ></TextButton>
        <TextButton
          text={"Back To Log In"}
          color={"#f2f8fc"}
          textColor={"#33363B"}
          onPress={() => {
            navigation.navigate("Login");
          }}
          hasBorder={true}
        ></TextButton>
      </View>
    </View>
  );
}

const styles = {
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  body: {
    flex: 1,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
};
