import {
  View,
  Image,
  TextInput,
  StyleSheet,
  ScrollView,
  Text,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../components/searchbar";

export default function AllChats({ navigation }) {
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/carpool-logo.png")}
        style={{
          marginTop: 40,
          width: 150,
          height: 40,
          marginBottom: 20,
          resizeMode: "contain",
        }}
      ></Image>
      <SearchBar placeholder={"Search Chat"} icon={"search"} />
      <ScrollView style={{ flex: 1 }}>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
        <ChatItem
          name="Ali"
          lastMessage={"hi, how are you?"}
          time={"5:06 pm"}
          navigation={navigation}
        ></ChatItem>
      </ScrollView>
    </View>
  );
}

function ChatItem({ name, lastMessage, time, navigation }) {
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("Chat");
      }}
    >
      <View style={styles.chatItem}>
        <View>
          <Text style={{ fontSize: 20, fontWeight: "500" }}>{name}</Text>
          <Text>{lastMessage}</Text>
        </View>
        <Text>{time}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  chatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    marginHorizontal: 16,
  },
});
