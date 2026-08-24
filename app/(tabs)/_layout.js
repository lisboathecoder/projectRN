import { Tabs } from "expo-router";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShadowVisible: false,
        tabBarActiveTintColor: "#fe0f0f",
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "600",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Início",
          headerTitle: "Projeto Base",
        }}
      />
      <Tabs.Screen
        name="post"
        options={{
          title: "Post",
          headerTitle: "Api do codeverse",
        }}
      />
            <Tabs.Screen
        name="get"
        options={{
          title: "Get",
          headerTitle: "Api do codeverse",
        }}
      />
            <Tabs.Screen
        name="sobre"
        options={{
          title: "Sobre",
          headerTitle: "Sobre",
        }}
      />
    </Tabs>
  );
}
