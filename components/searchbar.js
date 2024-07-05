import { View, TextInput, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import FO6 from "react-native-vector-icons/FontAwesome6";

export default function SearchBar({ placeholder, icon }) {
  return (
    <View style={styles.searchBar}>
      <TextInput placeholder={placeholder}></TextInput>
      {icon==="search" ?<Icon
        name={icon}
        size={16}
        color={"gray"}
        style={{ marginTop: 5 }}
      ></Icon> : <FO6
        name={icon}
        size={16}
        color={"gray"}
        style={{ marginTop: 5 }}
      ></FO6>}
      
    </View>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    backgroundColor: "#f2f8fc",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 16,
  },
});
