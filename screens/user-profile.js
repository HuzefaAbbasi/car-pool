import Header from "../components/header";
import { View, StyleSheet, ScrollView, Text, Alert } from "react-native";
import RideCard from "../components/card";
import { useAuth } from "../AuthContext";
import { useEffect, useState } from "react";
import axios from "axios";

export default function UserProfile({ navigation }) {
  const { user, token } = useAuth();
  const [rides, setRides] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://carpool.qwertyexperts.com/api/posts/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            userId: user._id,
          },
        }
      );
      const data = response.data.result.data;
      setRides(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Some error occured");
    }
  };

  useEffect(() => {
    fetchData();
  }, [rides]);

  return (
    <View style={styles.container}>
      <Header title={"Profile"} />
      <View style={{ padding: 16 }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={styles.heading}>Details</Text>
          <Text
            onPress={() => navigation.navigate("ChangePassword")}
            style={{ color: "#0075FD", fontWeight: "500" }}
          >
            Change Password
          </Text>
        </View>

        <Text style={styles.details}>
          Name: {user.firstName} {user.lastName}{" "}
        </Text>
        <Text style={styles.details}>Email: {user.email}</Text>

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
        {rides &&
          rides.map((ride) => {
            if (ride.userId._id == user._id) {
              return (
                <RideCard
                  key={ride._id}
                  name={ride.userId.firstName}
                  to={ride.to}
                  from={ride.from}
                  vehicleType={ride.vehicleType}
                  departureTime={ride.departuteTime}
                  arrivalTime={ride.arrivalTime}
                  totalSeats={ride.totalSeats}
                  availableSeats={ride.availableSeats}
                  id={ride._id}
                />
              );
            } else {
              return null;
            }
          })}
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
