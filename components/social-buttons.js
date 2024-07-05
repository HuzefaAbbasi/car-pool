import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
export default function SocialButtons({ icon, text }) {
  return (
    <TouchableOpacity style={styles.socialButtons}>
      <Icon name={icon} style={{ marginRight: 8 }}></Icon>
      <Text>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  socialButtons: {
    height: 48,
    flexDirection: "row",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DDDDDD",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 16,
  },
});
