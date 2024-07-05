import { StyleSheet } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome6";
import SignUp from "./screens/authentication/signup";
import Login from "./screens/authentication/login";
import ForgotPasswordEnterEmail from "./screens/authentication/forgot-password-enter-email";
import ForgotPasswordEmailSent from "./screens/authentication/forgot-password-mail-sent";
import ChangePassword from "./screens/authentication/change-password";
import PasswordChanged from "./screens/authentication/password-changed";
import SplashScreen from "./screens/splashscreen";
import VerifyEmail from "./screens/authentication/verify-email";
import CreateRide from "./screens/createride";
import Chat from "./screens/chat";
import AllChats from "./screens/allchats";
import Home from "./screens/home";
import UserProfile from "./screens/user-profile";
import Requests from "./screens/authentication/requests";

function BottomNavigation() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        headerShown: false,
        activeTintColor: "#0075FD",
        inactiveTintColor: "#f2f8fc",

        tabBarIcon: ({ focused, size }) => {
          let iconName;
          if (route.name === "Home") {
            iconName = "house";
          } else if (route.name === "AllChats") {
            iconName = "envelope";
          } else if (route.name === "UserProfile") {
            iconName = "user";
          } else if (route.name === "Requests") {
            iconName = "car-on";
          }
          return (
            <Icon
              name={iconName}
              size={size}
              color={focused ? "#0075FD" : "gray"}
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="AllChats" component={AllChats} />
      <Tab.Screen name="UserProfile" component={UserProfile} />
      <Tab.Screen name="Requests" component={Requests} />
    </Tab.Navigator>
  );
}

function MyStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={SignUp} />
      <Stack.Screen name="VerifyEmail" component={VerifyEmail} />
      <Stack.Screen name="SplashScreen" component={SplashScreen} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="UserProfile" component={UserProfile} />
      <Stack.Screen name="AllChats" component={AllChats} />
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />

      <Stack.Screen
        name="ForgotPasswordEnterEmail"
        component={ForgotPasswordEnterEmail}
      />
      <Stack.Screen
        name="ForgotPasswordEmailSent"
        component={ForgotPasswordEmailSent}
      />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="PasswordChanged" component={PasswordChanged} />
      <Stack.Screen name="CreateRide" component={CreateRide} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
