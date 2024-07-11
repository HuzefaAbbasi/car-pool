import React from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelWithField from "../../components/label-with-field";
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";
import DatePickerInput from "../../components/datepicker";
import axios from "axios";
import { format } from "date-fns";
const { height } = Dimensions.get("window");

const SignUpSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  dob: Yup.date().required("Date of Birth is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function SignUp({ navigation }) {
  const handleSignUp = async (values) => {
    const formattedValues = {
      ...values,
      dob: format(new Date(values.dob), "MM-dd-yyyy"),
    };

    console.log(formattedValues);

    try {
      const response = await axios.post(
        "https://carpool.qwertyexperts.com/api/auth/sign-up",
        formattedValues
      );

      console.log("Success:", response.data);
      navigation.navigate("VerifyEmail");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Header title={"Create An Account"} />
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          email: "",
          dob: null,
          password: "",
        }}
        validationSchema={SignUpSchema}
        onSubmit={handleSignUp}
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
                label={"First Name"}
                placeholder={"Enter First Name"}
                icon={"user"}
                value={values.firstName}
                onChangeText={handleChange("firstName")}
                onBlur={handleBlur("firstName")}
                error={errors.firstName}
                touched={touched.firstName}
              />
              <LabelWithField
                label={"Last Name"}
                placeholder={"Enter Last Name"}
                icon={"user"}
                value={values.lastName}
                onChangeText={handleChange("lastName")}
                onBlur={handleBlur("lastName")}
                error={errors.lastName}
                touched={touched.lastName}
              />
              <LabelWithField
                label={"Email"}
                placeholder={"Enter Email Address"}
                icon={"envelope"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
              />
              <DatePickerInput
                label={"Date of Birth"}
                value={values.dob}
                onChange={(date) => setFieldValue("dob", date)}
                onBlur={handleBlur("dob")}
              />
              <LabelWithField
                label={"Password"}
                placeholder={"Enter Password"}
                icon={"lock"}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                error={errors.password}
                touched={touched.password}
              />
            </ScrollView>

            <SizedBox height={height * 0.02} />
            <TextButton
              text={"Create an Account"}
              color={"#0075FD"}
              textColor={"#fff"}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View style={styles.footer}>
        <Text style={{ color: "#8E8E8E", fontSize: 14 }}>
          Already have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Login");
          }}
          style={{ color: "#054BB4", fontSize: 14 }}
        >
          {"  "}
          Login
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginBottom: 20,
  },
});
