import { StyleSheet, View, Image, ScrollView } from "react-native";
import SearchBar from "../components/searchbar";
import SizedBox from "../components/sizedbox";
import RideCard from "../components/card";
import { useEffect, useState } from "react";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Icon from "react-native-vector-icons/MaterialIcons";

export default function Home({ navigation }) {
  const { user, token, clearToken } = useAuth();
  const [rides, setRides] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://carpool.qwertyexperts.com/api/posts/list",
        {
          headers: {
            Authorization: `Bearer ${token}`,
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

  const logout = (navigation) => {
    clearToken();
    navigation.replace("Login");
  };
  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row" }}>
        <View style={{ width: "18%" }}></View>
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
        <View>
          <Icon
            style={{ marginTop: 70, marginLeft: 20 }}
            name="logout"
            size={30}
            onPress={() => {
              logout(navigation);
            }}
          />
        </View>
      </View>

      <SearchBar placeholder={"From"} icon={"location-dot"} />
      <SizedBox height={16} />
      <SearchBar placeholder={"To"} icon={"location-crosshairs"} />
      <SizedBox height={16} />
      <ScrollView>
        {rides &&
          rides.map((ride) => {
            if (ride.userId._id != user._id) {
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
});
