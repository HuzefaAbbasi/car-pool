import { View, Text, Dimensions, Image } from "react-native";
const { height } = Dimensions.get("window");
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";

export default function ForgotPasswordMailSent({ navigation }) {
  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.05} />
      <Header
        title={"Forgot Password"}
        text={
          " We've sent reset password link to your email alisonh952@gmail.com"
        }
      />
      <View style={styles.body}>
        <View style={{ flex: 1 }}></View>
        <TextButton
          text={"Continue"}
          color={"#0075FD"}
          textColor={"#fff"}
          onPress={() => {
            navigation.navigate("ChangePassword");
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
