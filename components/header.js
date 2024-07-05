import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
const { height } = Dimensions.get("window");

export default function Header({ title, text }) {
  return (
    <View style={styles.header}>
      <Image
        source={require("../assets/carpool-logo.png")}
        style={{
          marginTop: 40,
          width: 240,
          height: 60,
          marginBottom: 20,
          resizeMode: "contain",
        }}
      ></Image>
      <Text style={styles.heading}>{title}</Text>
      {text && <OptionalText text={text} />}
    </View>
  );
}

function OptionalText({ text }) {
  return <Text style={{ textAlign: "center" }}>{text}</Text>;
}

const styles = StyleSheet.create({
  header: {
    marginTop: 68,
    height: height * 0.2,

    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 32,
    fontFamily: "monospace",
    fontWeight: "700",
    marginBottom: 10,
  },
});
