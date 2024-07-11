import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Platform,
  TouchableOpacity,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "react-native-vector-icons/FontAwesome6";

export default function TimePickerInput({ label, value, onChange, onBlur }) {
  const [show, setShow] = useState(false);

  const onChangeTime = (event, selectedTime) => {
    setShow(Platform.OS === "ios");
    if (selectedTime) {
      onChange(selectedTime);
      onBlur();
    }
  };

  const showTimePicker = () => {
    setShow(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TouchableOpacity onPress={showTimePicker}>
        <View style={styles.textBox}>
          <Text>
            {value
              ? value.toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                  hour12: true,
                })
              : "Select Time"}
          </Text>
          <Icon name={"clock"} size={15} />
        </View>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="time"
          display="default"
          onChange={onChangeTime}
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
