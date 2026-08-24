import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.top}>
        <Ionicons name="help-circle-outline" size={100} color="red" />
        <Text styles={styles.h3}>
          Esse projeto é o primeiro de mobile no Terceiro Semestre!
        </Text>
      </View>
      <View style={styles.card}>
        <Image
          source={{
            uri: "https://avatars.githubusercontent.com/u/155676204?v=4",
          }}
          style={styles.avatar}
        />
        <Text style={styles.h3}>
          Sou um estudante do SENAI, no curso de Desenvolvimentos de Sistemas.{" "}
          {"\n"}
          Tenho experiência com React, React Native, JavaScript, DOM, HTML e
          CSS. Estou sempre buscando aprender novas tecnologias e aprimorar
          minhas habilidades.
        </Text>
      </View>
      <View style={styles.cardSocials}>
        <Text style={styles.socials}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL("https://linkedin.com/in/glisboa")}
          >
            <Ionicons name="logo-linkedin" size={30} color="red" />
          </TouchableOpacity>
        </Text>
        <Text style={styles.socials}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL("https://instagram.com/oglisboaaa")}
          >
            <Ionicons name="logo-instagram" size={30} color="red" />
          </TouchableOpacity>
        </Text>
        <Text style={styles.socials}>
          <TouchableOpacity
            style={styles.link}
            onPress={() => Linking.openURL("https://github.com/lisboathecoder")}
          >
            <Ionicons name="logo-github" size={30} color="red" />
          </TouchableOpacity>
        </Text>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    safeArea: 1,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  top: {
    alignItems: "center",
    marginBottom: 20,
  },
  card: {
    gap: 5,
    padding: 20,
    borderRadius: 20,
    backgroundColor: "#ffffff",
    alignItems: "center",
  },
  h3: {
    fontSize: 14,
    textAlign: "center",
    marginLeft: 5,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#ff0000",
    marginBottom: 10,
  },
  cardSocials: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  socials: {
    fontSize: 14,
  },
  logo: {
    marginRight: 5,
  },
});
