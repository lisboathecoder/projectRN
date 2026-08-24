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
          title: "Criar",
          headerTitle: "Criar Animes",
        }}
      />
            <Tabs.Screen
        name="get"
        options={{
          title: "Buscar",
          headerTitle: "Buscar Animes",
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
