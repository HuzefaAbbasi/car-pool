import React from "react";
import { View, Dimensions, StyleSheet, Alert } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import LabelWithField from "../../components/label-with-field";
import TextButton from "../../components/text-button";
import SizedBox from "../../components/sizedbox";
import Header from "../../components/header";
import axios from "axios";
import { useAuth } from "../../AuthContext";

const { height } = Dimensions.get("window");

const ChangePasswordSchema = Yup.object().shape({
  oldPassword: Yup.string().required("Old Password is required"),
  newPassword: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("New Password is required"),
  confirmNewPassword: Yup.string()
    .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
    .required("Confirm New Password is required"),
});

export default function ChangePassword({ navigation }) {
  const { user, token } = useAuth();
  const handleChangePassword = async (values) => {
    console.log(values);
    try {
      const { oldPassword, newPassword, confirmNewPassword } = values;
      console.log(oldPassword, newPassword, confirmNewPassword, user._id);

      const response = await axios.post(
        "https://carpool.qwertyexperts.com/api/auth/change-password",
        {
          userId: user._id,
          oldPassword: oldPassword,
          newPassword: newPassword,
          confirmNewPassword: confirmNewPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);
      navigation.navigate("PasswordChanged");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "some error occured");
    }
  };

  return (
    <View style={styles.container}>
      <SizedBox height={height * 0.06} />
      <Header
        title={"Change Password"}
        text={
          "New password must be different from your previously used passwords."
        }
      />
      <View style={styles.body}>
        <Formik
          initialValues={{
            oldPassword: "",
            newPassword: "",
            confirmNewPassword: "",
          }}
          validationSchema={ChangePasswordSchema}
          onSubmit={handleChangePassword}
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
              <SizedBox height={height * 0.03} />
              <LabelWithField
                label={"Old Password"}
                placeholder={"Enter old Password"}
                icon={"lock"}
                value={values.oldPassword}
                onChangeText={handleChange("oldPassword")}
                onBlur={handleBlur("oldPassword")}
                error={errors.oldPassword}
                touched={touched.oldPassword}
              />
              <LabelWithField
                label={"New Password"}
                placeholder={"Enter New Password"}
                icon={"lock"}
                value={values.newPassword}
                onChangeText={handleChange("newPassword")}
                onBlur={handleBlur("newPassword")}
                error={errors.newPassword}
                touched={touched.newPassword}
              />
              <LabelWithField
                label={"Confirm New Password"}
                placeholder={"Enter Confirm New Password"}
                icon={"lock"}
                value={values.confirmNewPassword}
                onChangeText={handleChange("confirmNewPassword")}
                onBlur={handleBlur("confirmNewPassword")}
                error={errors.confirmNewPassword}
                touched={touched.confirmNewPassword}
              />
              <View style={{ flex: 1 }}></View>
              <TextButton
                text={"Reset Password"}
                color={"#0075FD"}
                textColor={"#fff"}
                onPress={handleSubmit}
              />
              <TextButton
                text={"Back To Log In"}
                color={"#f2f8fc"}
                textColor={"#33363B"}
                onPress={() => {
                  navigation.navigate("Login");
                }}
                hasBorder={true}
              />
            </>
          )}
        </Formik>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#fff",
    flex: 1,
  },
  body: {
    flex: 1,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
});
