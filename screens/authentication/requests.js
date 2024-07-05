import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Header from "../../components/header";
import Icon from "react-native-vector-icons/Entypo";
import SizedBox from "../../components/sizedbox";

export default function Requests() {
  return (
    <View style={styles.container}>
      <Header title={"Requests"} />
      <ScrollView>
        <RequestItem />
        <RequestItem />
        <RequestItem />
        <RequestItem />
      </ScrollView>
    </View>
  );
}

function RequestItem() {
  return (
    <View style={styles.item}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>Ali</Text>
        <Text style={{ color: "#8E8E8E" }}>+923456789</Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CircularButton
          bgColor={"#DFFFD6"}
          icon={"check"}
          borderColor={"green"}
        />
        <CircularButton
          bgColor={"#FFD6D6"}
          icon={"cross"}
          borderColor={"red"}
        />
      </View>
    </View>
  );
}

function CircularButton({ bgColor, icon, borderColor }) {
  return (
    <TouchableOpacity>
      <View
        style={[
          styles.circularButton,
          { borderColor: borderColor, backgroundColor: bgColor },
        ]}
      >
        <Icon name={icon} size={24} />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  item: {
    marginTop: 16,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  circularButton: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    marginRight: 16,
  },
});
