import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import SizedBox from "./sizedbox";
const { height } = Dimensions.get("window");

export default function RideCard({ hasPill }) {
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
          <Text style={{ fontSize: 20, fontWeight: "500" }}>Ali</Text>
          {hasPill ? (
            <View style={styles.pill}>
              <Text style={[styles.heading, { color: "#fff" }]}>
                Coming in 5
              </Text>
            </View>
          ) : null}
        </View>
        <SizedBox height={16} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
          }}
        >
          <Text style={styles.heading}>Price</Text>
          <Text style={styles.heading}>Vehicle</Text>
          <Text style={styles.heading}>PickupTime</Text>
        </View>
        <SizedBox height={8} />
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            paddingHorizontal: 14,
          }}
        >
          <Text>500$</Text>
          <Text>Honda City</Text>
          <Text>4:00pm</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.cardButton}>
        <Text style={{ fontWeight: "500" }}>Request a Ride</Text>
      </TouchableOpacity>
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
  pill: {
    backgroundColor: "#007aff",
    paddingHorizontal: 16,

    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
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
  secondaryText: {
    textAlign: "center",
  },
  heading: {
    fontSize: 16,
    fontWeight: "500",
  },
});
