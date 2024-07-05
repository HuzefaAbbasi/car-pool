import { StyleSheet, View, Image, ScrollView, Dimensions } from "react-native";
import SearchBar from "../components/searchbar";
import SizedBox from "../components/sizedbox";
import RideCard from "../components/card";

export default function Home({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={{ alignItems: "center" }}>
        <Image
          source={require("../assets/carpool-logo.png")}
          style={{
            marginTop: 60,
            width: 240,
            height: 60,
            marginBottom: 20,
            resizeMode: "contain",
          }}
        ></Image>
      </View>

      <SearchBar placeholder={"From"} icon={"location-dot"} />
      <SizedBox height={16} />
      <SearchBar placeholder={"To"} icon={"location-crosshairs"} />
      <SizedBox height={16} />
      <ScrollView>
        <RideCard hasPill={true} />
        <RideCard hasPill={true} />
        <RideCard hasPill={true} />
        <RideCard hasPill={true} />
        <RideCard hasPill={true} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
