import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions, Alert } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  GiftedChat,
  Bubble,
  InputToolbar,
  Send,
} from "react-native-gifted-chat";
import { useAuth } from "../AuthContext";
import axios from "axios";
const { height } = Dimensions.get("window");

const renderInputToolBar = (props) => {
  return (
    <InputToolbar
      {...props}
      containerStyle={{
        borderRadius: 16,
        backgroundColor: "#f2f8fc",
        marginHorizontal: 8,
        marginTop: 5,
        borderTopWidth: 0,
      }}
    />
  );
};

const renderSend = (props) => {
  return (
    <Send {...props}>
      <View style={{ marginBottom: 11 }}>
        <Icon name="send" size={24} color="#0075FD" />
      </View>
    </Send>
  );
};

const renderBubble = (props) => {
  return (
    <Bubble
      {...props}
      wrapperStyle={{
        left: {
          backgroundColor: "#f2f8fc",
        },
        right: {
          backgroundColor: "#0075FD",
        },
      }}
    />
  );
};
export default function Chat({ navigation }) {
  const { token, user, postId } = useAuth();
  const [threadId, setThreadId] = useState(null);
  const [apiMessages, setApiMessages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [otherUser, setOtherUser] = useState(null);

  const getThreadInfo = async (postId) => {
    try {
      const response = await axios.get(
        `https://carpool.qwertyexperts.com/api/thread/show/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const thread = response.data;
      console.log("Thread: ", thread);

      //setting thread id
      setThreadId(thread.result._id);

      console.log("Other userrrrrrr");
      // setting users for chat
      let otherUserId = "";
      if (thread.result.userA === user._id) {
        otherUserId = thread.result.userB;
      } else {
        otherUserId = thread.result.userA;
      }
      console.log("Other userrrrrrr");
      console.log("Other User Id: ", otherUserId);
      // Getting other user data
      const response2 = await axios.get(
        `https://carpool.qwertyexperts.com/api/user/show/${otherUserId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Other User response: ", response2.data.result);
      setOtherUser(response2.data.result);
    } catch (error) {
      console.log("Error Get Thread Info: ", error);
    }
  };

  const fetchMessages = async () => {
    try {
      console.log("Thread id", threadId);
      const response = await axios.get(
        `https://carpool.qwertyexperts.com/api/message/list/${threadId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data.result.data;
      // console.log("Messages: ", JSON.stringify(data));
      setApiMessages(data);
    } catch (error) {
      console.log("Error Fetches Messages: ", error);
    }
  };

  const convertMessages = (apiMessages) => {
    return apiMessages.map((msg) => ({
      _id: msg._id,
      text: msg.message,
      createdAt: new Date(msg.createdAt),
      user: {
        _id: msg.userFrom._id,
      },
    }));
  };

  useEffect(() => {
    console.log("postId: ", postId);
    if (postId) {
      getThreadInfo(postId);
      if (threadId) {
        console.log("Getting messages...");
        fetchMessages();
        // for formatting msg in a format accepted by Gifted chat
        if (apiMessages) {
          console.log("formatting messages...");
          setMessages(convertMessages(apiMessages));
          // console.log("formated messages:", messages);
          // console.log("Other user:", otherUser);
        }
      }
    }
  }, [postId, threadId, apiMessages]);

  // useEffect(() => {
  //   if (postId) {
  //     getThreadInfo(postId);
  //   }
  // }, [postId]);

  // useEffect(() => {
  //   if (threadId) {
  //     fetchMessages();
  //   }
  // }, [threadId]);

  // useEffect(() => {
  //   if (apiMessages.length) {
  //     setMessages(convertMessages(apiMessages));
  //     // console.log("formated messages:", messages);
  //   }
  // }, [apiMessages]);

  const onSend = useCallback(
    (messages = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, messages)
      );

      sendMessage(messages[0].text);
    },
    [threadId]
  );

  const sendMessage = async (message) => {
    // console.log("threadId", threadId);
    // console.log(message);
    // console.log(token);
    try {
      const response = await axios.post(
        `https://carpool.qwertyexperts.com/api/message`,
        {
          thread: threadId,
          message: message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      console.log("Send Message Response: ", data);
    } catch (error) {
      Alert.alert("Error", "Error sending message");
      console.log("Sending Message Error: ", error);
    }
  };

  if (postId) {
    if (apiMessages) {
      return (
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.heading}>{otherUser?.firstName} </Text>
          </View>

          <GiftedChat
            messages={messages}
            onSend={(messages) => onSend(messages)}
            user={{
              _id: user._id,
            }}
            renderAvatar={null}
            renderUsernameOnMessage={false}
            renderBubble={renderBubble}
            renderInputToolbar={renderInputToolBar}
            renderSend={renderSend}
          />
        </View>
      );
    } else {
      return (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text>No Messages yet</Text>
        </View>
      );
    }
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No Messages yet</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    paddingTop: height * 0.07,
    flexDirection: "row",
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#DDDDDD",
    paddingVertical: 8,
    backgroundColor: "#f2f8fc",
  },
  heading: {
    fontWeight: "500",
    paddingLeft: 16,
    fontSize: 20,
  },
});
