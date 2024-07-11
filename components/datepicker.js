import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome";

export default function DatePickerInput({ label, value, onChange, onBlur }) {
  const [show, setShow] = useState(false);

  const onChangeDate = (event, selectedDate) => {
    setShow(Platform.OS === "ios");
    if (selectedDate) {
      onChange(selectedDate);
      onBlur();
    }
  };

  const showDatePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity  onPress={showDatePicker}>
       
        <View style={styles.textBox}>
          <Text>{value ? value.toDateString() : "Select Date"}</Text>
          <Icon name={"calendar"} size={15} />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display="default"
          onChange={onChangeDate}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
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
  label: {
    marginBottom: 16,
    fontWeight: "500",
    fontSize: 16,
  },
});
