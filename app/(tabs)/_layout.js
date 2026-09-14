import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShadowVisible: false,
                headerStyle: {
                    backgroundColor: '#000000',
                },
                headerTitleStyle: {
                    color: '#fcfdfd',
                },
                headerTintColor: '#fcfdfd',
                tabBarActiveBackgroundColor: '#000000',
                tabBarActiveBackgroundColor: '#000000',
                tabBarInactiveBackgroundColor: '#000000',
                tabBarActiveTintColor: '#fe0f0f',
                tabBarInactiveTintColor: '#fcfdfd',
                tabBarStyle: {
                    backgroundColor: '#000000',
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '600',
                },
            }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Início',
                    headerTitle: 'Home',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="home" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="get"
                options={{
                    title: 'Buscar',
                    headerTitle: 'Buscar Animes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="search" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="post"
                options={{
                    title: 'Criar',
                    headerTitle: 'Criar Animes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="add-circle" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="delete"
                options={{
                    title: 'Excluir',
                    headerTitle: 'Excluir Animes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="trash" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="update"
                options={{
                    title: 'Atualizar',
                    headerTitle: 'Atualizar Animes',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="create" color={color} size={size} />
                    ),
                }}
            />
            <Tabs.Screen
                name="sobre"
                options={{
                    title: 'Sobre',
                    headerTitle: 'Sobre',
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="information-circle" color={color} size={size} />
                    ),
                }}
            />
        </Tabs>
    );
}
