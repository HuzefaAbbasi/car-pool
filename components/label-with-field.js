import { StyleSheet, Text, TextInput, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome6";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";

export default function LabelWithField({
  label,
  placeholder,
  icon,
  value,
  onChangeText,
  onBlur,
  error,
  touched,
}) {
  return (
    <View style={{ marginBottom: 16 }}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.textBox}>
        <TextInput
          style={styles.textinput}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          onBlur={onBlur}
          error={error}
          touched={touched}
          secureTextEntry={label.includes("Password")}
        ></TextInput>
        {icon === "car-seat" ? (
          <MaterialIcon name={icon} size={15} />
        ) : (
          <Icon name={icon} size={15} />
        )}
      </View>
      {touched && error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  label: { fontSize: 16, fontWeight: "500", marginBottom: 16 },
  textBox: {
    backgroundColor: "#f2f8fc",
    height: 56,
    borderColor: "#DDDDDD",
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 16,
  },
  textInput: {
    padding: 10,
    flex: 1,
  },
  errorText: {
    color: "red",
    paddingHorizontal: 10,
  },
});
