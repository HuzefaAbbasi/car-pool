import Header from "../components/header";
import { View, StyleSheet, ScrollView, Text } from "react-native";
import RideCard from "../components/card";

export default function UserProfile({ navigation }) {
  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      <View style={{ padding: 16 }}>
        <Text style={styles.heading}>Details</Text>
        <Text style={styles.details}>Name: Ali Ahmad</Text>
        <Text style={styles.details}>Email: ali@gmail.com</Text>
        <Text style={styles.details}>Phone number: +923456789</Text>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={styles.heading}>My Rides</Text>
          <Text
            onPress={() => navigation.navigate("CreateRide")}
            style={{ color: "#0075FD", fontWeight: "500" }}
          >
            Create a Ride
          </Text>
        </View>
      </View>
      <ScrollView>
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
        <RideCard />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontFamily: "monospace",
    fontWeight: "700",
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    fontWeight: "500",
    marginBottom: 10,
  },
});
