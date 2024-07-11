import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelWithField from "../components/label-with-field";
import TextButton from "../components/text-button";
import SizedBox from "../components/sizedbox";
import Header from "../components/header";
import TimePickerInput from "../components/timepicker";
import axios from "axios";
import { useAuth } from "../AuthContext";
import { format } from "date-fns";

const { height } = Dimensions.get("window");

const RideSchema = Yup.object().shape({
  from: Yup.string().required("Starting location is required"),
  to: Yup.string().required("Destination location is required"),
  departureTime: Yup.date().required("Departure time is required"),
  arrivalTime: Yup.date().required("Arrival time is required"),
  vehicleType: Yup.string().required("Vehicle type is required"),
  totalSeats: Yup.number()
    .min(1, "Total seats must be at least 1")
    .required("Total seats are required"),
});

export default function CreateRide({ navigation }) {
  const { token } = useAuth();
  const handleCreateRide = async (values) => {
    try {
      const formattedValues = {
        ...values,
        departureTime: format(new Date(values.departureTime), "hh:mma"),
        arrivalTime: format(new Date(values.arrivalTime), "hh:mma"),
      };
      console.log(formattedValues);
      const response = await axios.post(
        "https://carpool.qwertyexperts.com/api/posts",
        formattedValues,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Success:", response.data);
      navigation.navigate("UserProfile");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Create A Ride"} />
      <Formik
        initialValues={{
          from: "",
          to: "",
          departureTime: null,
          arrivalTime: null,
          vehicleType: "",
          totalSeats: "",
        }}
        validationSchema={RideSchema}
        onSubmit={handleCreateRide}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          setFieldValue,
          values,
          errors,
          touched,
        }) => (
          <>
            <ScrollView style={{ height: height * 0.58 }}>
              <LabelWithField
                label={"From"}
                placeholder={"Choose Starting Location"}
                icon={"location-dot"}
                value={values.from}
                onChangeText={handleChange("from")}
                onBlur={handleBlur("from")}
                error={errors.from}
                touched={touched.from}
              />
              <LabelWithField
                label={"To"}
                placeholder={"Enter Destination Location"}
                icon={"location-crosshairs"}
                value={values.to}
                onChangeText={handleChange("to")}
                onBlur={handleBlur("to")}
                error={errors.to}
                touched={touched.to}
              />
              <TimePickerInput
                label={"Departure Time"}
                value={values.departureTime}
                onChange={(time) => setFieldValue("departureTime", time)}
                onBlur={handleBlur("departureTime")}
              />
              <TimePickerInput
                label={"Arrival Time"}
                value={values.arrivalTime}
                onChange={(time) => setFieldValue("arrivalTime", time)}
                onBlur={handleBlur("arrivalTime")}
              />
              <LabelWithField
                label={"Vehicle Type"}
                placeholder={"Enter Vehicle Type"}
                icon={"car"}
                value={values.vehicleType}
                onChangeText={handleChange("vehicleType")}
                onBlur={handleBlur("vehicleType")}
                error={errors.vehicleType}
                touched={touched.vehicleType}
              />
              <LabelWithField
                label={"Total Seats"}
                placeholder={"Enter Number of total Seats"}
                icon={"car-seat"}
                value={values.totalSeats}
                onChangeText={handleChange("totalSeats")}
                onBlur={handleBlur("totalSeats")}
                error={errors.totalSeats}
                touched={touched.totalSeats}
                keyboardType={"numeric"}
              />
            </ScrollView>

            <SizedBox height={height * 0.02} />
            <TextButton
              text={"Create a Ride"}
              color={"#0075FD"}
              textColor={"#fff"}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginBottom: 20,
  },
});
