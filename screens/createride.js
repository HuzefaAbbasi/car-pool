import { View, Text, Dimensions, StyleSheet } from "react-native";
const { width, height } = Dimensions.get("window");
import LabelWithField from "../components/label-with-field";
import TextButton from "../components/text-button";
import SizedBox from "../components/sizedbox";
import Icon from "react-native";

export default function CreateRide({ navigation }) {
  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.04} />
      <Text style={styles.heading}>Create A Ride</Text>
      <View style={{ alignContent: "center" }}>
        <LabelWithField
          label={"From"}
          placeholder={"Choose Starting Location"}
          icon={"location-dot"}
        ></LabelWithField>
        <LabelWithField
          label={"To"}
          placeholder={"Enter Destination Location"}
          icon={"location-crosshairs"}
        ></LabelWithField>
        <LabelWithField
          label={"Time"}
          placeholder={"Enter Starting Time"}
          icon={"clock"}
        ></LabelWithField>
        <LabelWithField
          label={"Vehicle"}
          placeholder={"Enter Vehicle Name"}
          icon={"car"}
        ></LabelWithField>
        <LabelWithField
          label={"Total Seats"}
          placeholder={"Enter Number of total Seats"}
          icon={"car-seat"}
        ></LabelWithField>
        <LabelWithField
          label={"Vehicle"}
          placeholder={"Enter Number of availaible Seats"}
          icon={"car-seat"}
        ></LabelWithField>
        <SizedBox height={height * 0.02} />
      </View>
      <TextButton
        text={"Create a Ride"}
        color={"#0075FD"}
        textColor={"#fff"}
        onPress={() => {
          //   navigation.navigate("VerifyEmail");
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
  heading: {
    fontWeight: "700",
    fontSize: 20,
    fontFamily: "monospace",
    marginBottom: 16,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
  },
});
