import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Modal,
  Button,
  TextInput,
  Alert,
} from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import SizedBox from "./sizedbox";
import { useAuth } from "../AuthContext";
import axios from "axios";
import Icon from "react-native-vector-icons/Entypo";

const { height, width } = Dimensions.get("window");

const validationSchema = Yup.object().shape({
  seats: Yup.number()
    .min(1, "At least one seat is required")
    .max(40, "Maximum 10 seats can be requested")
    .required("Number of seats is required"),
});

export default function RideCard({
  name,
  from,
  to,
  vehicleType,
  departureTime,
  arrivalTime,
  totalSeats,
  availableSeats,
  id,
}) {
  const [modalVisible, setModalVisible] = useState(false);
  const { token, savePostId } = useAuth();

  const handleRequest = async (values) => {
    console.log(`Requested ${values.seats} seats`);
    const formattedValues = { post: id, seats: values.seats };
    console.log(formattedValues);
    try {
      const response = await axios.post(
        "https://carpool.qwertyexperts.com/api/requests",
        formattedValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      Alert.alert("Success", "Request Sent");
      // saving postId for messaging use
      savePostId(id);
      console.log(response.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        Alert.alert("Error", error.response.data.message || "Bad request");
      } else {
        Alert.alert("Error", "Something went wrong. Please try again.");
      }
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
            paddingTop: 10,
          }}
        >
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
        </View>
        <SizedBox height={8} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
          }}
        >
          <Text style={styles.heading}> {vehicleType}</Text>
        </View>
        <SizedBox height={6} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
          }}
        >
          <View>
            <Text style={{ fontWeight: "500" }}>
              {from} - {to}
            </Text>
            <Text style={{ color: "gray" }}>
              {departureTime} - {arrivalTime}
            </Text>
          </View>
          <View>
            <Text style={{ marginTop: 18, color: "gray" }}>
              {availableSeats}/{totalSeats} seats left
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cardButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ fontWeight: "500", color: "#0075FD" }}>
          Request a Ride
        </Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Request Seats</Text>
            <Formik
              initialValues={{ seats: "" }}
              validationSchema={validationSchema}
              onSubmit={handleRequest}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <View style={{ width: "100%" }}>
                  <TextInput
                    style={styles.input}
                    placeholder="Number of seats"
                    keyboardType="numeric"
                    onChangeText={handleChange("seats")}
                    onBlur={handleBlur("seats")}
                    value={values.seats}
                  />
                  {errors.seats && touched.seats && (
                    <Text style={styles.errorText}>{errors.seats}</Text>
                  )}
                  <View style={{ flexDirection: "row" }}>
                    <Icon
                      name={"check"}
                      backgroundColor={"#DFFFD6"}
                      onPress={handleSubmit}
                      size={30}
                      style={{ marginRight: 16 }}
                    />
                    <Icon
                      name={"cross"}
                      backgroundColor={"#FFD6D6"}
                      onPress={() => setModalVisible(false)}
                      size={30}
                      shape={"circle"}
                    />
                  </View>
                </View>
              )}
            </Formik>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    height: height * 0.2,
    marginHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#DDDDDD",
    marginBottom: 16,
  },
  cardButton: {
    backgroundColor: "#f2f8fc",
    alignItems: "center",
    padding: 12,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
    borderTopWidth: 1,
    borderColor: "#DDDDDD",
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: "monospace",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalView: {
    width: width * 0.8,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    height: 40,
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});
