import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AccountScreen from "../pages/AccountScreen";
import { RootStackParamList } from "../Types";

export type AccountStackParamList = {
  Account: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AccountStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: "#ff6600",
      }}
    >
      <Stack.Screen
        name="Account"
        component={AccountScreen}
        options={{ title: "My Account" }}
      />
    </Stack.Navigator>
  );
}
