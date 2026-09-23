import { Tabs } from 'expo-router';
import { Home, Briefcase, BookOpen, MessageSquare, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#121214',
          borderTopWidth: 0,
          elevation: 0,
          height: 70,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          left: 10,
          right: 10,
          bottom: 20,
          borderRadius: 24,
          borderWidth: 1,
          borderColor: '#27272a',
        },
        tabBarActiveTintColor: '#38bdf8',
        tabBarInactiveTintColor: '#71717a',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: '700',
          marginTop: 2,
        },
      }}>
      
      <Tabs.Screen name="index" options={{ title: 'Início', tabBarIcon: ({ color, focused }) => <Home size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} /> }} />
      <Tabs.Screen name="vagas" options={{ title: 'Vagas', tabBarIcon: ({ color, focused }) => <Briefcase size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} /> }} />
      <Tabs.Screen name="cursos" options={{ title: 'Cursos', tabBarIcon: ({ color, focused }) => <BookOpen size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} /> }} />
      <Tabs.Screen name="chat" options={{ title: 'Empresas', tabBarIcon: ({ color, focused }) => <MessageSquare size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} /> }} />
      <Tabs.Screen name="perfil" options={{ title: 'Perfil', tabBarIcon: ({ color, focused }) => <User size={20} color={color} strokeWidth={focused ? 2.5 : 1.8} /> }} />
    </Tabs>
  );
}