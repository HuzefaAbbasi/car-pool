import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Header from "../../components/header";
import Icon from "react-native-vector-icons/Entypo";
import { useAuth } from "../../AuthContext";
import { useState, useEffect } from "react";
import axios from "axios";

export default function Requests() {
  const { user, token, savePostId } = useAuth();
  const [requests, setRequests] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://carpool.qwertyexperts.com/api/requests/list",
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

      setRequests(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Some error occured");
    }
  };


  const acceptRequest = async (request) => {
    console.log("in accept request");
    try {
      //changing status to "Booked"
      const response = await axios.patch(
        `https://carpool.qwertyexperts.com/api/posts/${request.post._id}`,
        {
          status: "Booked",
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.message;
      Alert.alert("Success:", "Request Accepted");
      console.log("Status:", data);
      // storing postId for messaging purposes
      savePostId(request.post._id);
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Some error occured");
    }
  };

  useEffect(() => {
    fetchData();
  }, [requests]);

  return (
    <View style={styles.container}>
      <Header title={"Requests"} />
      <ScrollView>
        {requests &&
          requests.map((request) => {
            if (
              request.post.status != "Booked" &&
              request.from._id != user._id
            ) {
              return (
                <RequestItem
                  key={request._id}
                  name={request.from.firstName}
                  to={request.post.to}
                  from={request.post.from}
                  onPress={() => acceptRequest(request)}
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

function RequestItem({ name, to, from, onPress }) {
  return (
    <View style={styles.item}>
      <View>
        <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
        <Text style={{ color: "#8E8E8E" }}>
          {from} - {to}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <CircularButton
          bgColor={"#DFFFD6"}
          icon={"check"}
          borderColor={"green"}
          onPress={onPress}
        />
        <CircularButton
          bgColor={"#FFD6D6"}
          icon={"cross"}
          borderColor={"red"}
          onPress={() => {}}
        />
      </View>
    </View>
  );
}

function CircularButton({ bgColor, icon, borderColor, onPress }) {
  return (
    <TouchableOpacity onPress={onPress}>
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
