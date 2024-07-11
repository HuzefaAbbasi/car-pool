import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelWithField from "../../components/label-with-field";
import SizedBox from "../../components/sizedbox";
import TextButton from "../../components/text-button";
import Header from "../../components/header";
import axios from "axios";
import { useAuth } from "../../AuthContext";
const { height } = Dimensions.get("window");

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export default function Login({ navigation }) {
  const { saveToken, saveUser } = useAuth();

  const handleLogin = async (values) => {
    console.log(values);

    try {
      const response = await axios.post(
        "https://carpool.qwertyexperts.com/api/auth/login",
        values
      );
      console.log("Success:", response.data);

      saveToken(response.data.result.token);
      saveUser(response.data.result.user);

      // Navigate to the next screen or show success message
      navigation.replace("BottomNavigation");
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.06} />
      <Header title={"Login"} />
      <SizedBox height={height * 0.02} />
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={LoginSchema}
        onSubmit={handleLogin}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <>
            <View style={{ alignContent: "center" }}>
              <LabelWithField
                label={"Email"}
                placeholder={"Enter Email"}
                icon={"envelope"}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                error={errors.email}
                touched={touched.email}
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
              <Text
                onPress={() => {
                  navigation.navigate("ForgotPasswordEnterEmail");
                }}
                style={styles.forgotPassword}
              >
                Forgot Password?
              </Text>
              <SizedBox height={height * 0.05} />
            </View>
            <TextButton
              text={"Login"}
              color={"#0075FD"}
              textColor={"#fff"}
              onPress={handleSubmit}
            />
          </>
        )}
      </Formik>
      <View style={styles.footer}>
        <Text style={{ color: "#8E8E8E", fontSize: 14 }}>
          Don't have an account?
        </Text>
        <Text
          onPress={() => {
            navigation.navigate("Signup");
          }}
          style={{ color: "#054BB4", fontSize: 14 }}
        >
          {"  "}SignUp
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  forgotPassword: {
    textAlign: "right",
    textDecorationLine: "underline",
    marginBottom: 16,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
    flex: 1,
    marginBottom: 20,
  },
});
