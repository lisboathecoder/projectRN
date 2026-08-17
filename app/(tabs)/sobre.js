import {
  StyleSheet,
  View,
  Text,
  Linking,
  TouchableOpacity,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function AboutScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <Ionicons name="help-circle-outline" size={100} color="black" />
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
            <Text style={styles.logo}>
              <Ionicons name="logo-linkedin" size={18} color="black" />
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL("https://linkedin.com/in/glisboa")
                }
              ></Text>
            </Text>
          </Text>
          <Text style={styles.socials}>
            <Text style={styles.logo}>
              <Ionicons name="logo-instagram" size={18} color="black" />
              <TouchableOpacity
                style={styles.link}
                onPress={() =>
                  Linking.openURL("https://instagram.com/oglisboaaa")
                }
              ></TouchableOpacity>
            </Text>
          </Text>
          <Text style={styles.socials}>
            <Text style={styles.logo}>
              <Ionicons name="logo-github" size={18} color="black" />
              <Text
                style={styles.link}
                onPress={() =>
                  Linking.openURL("https://github.com/lisboathecoder")
                }
              ></Text>
            </Text>
          </Text>
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    gap: 5,
    padding: 100,
    borderRadius: 20,
    backgroundColor: "#ffffff",
  },
  h3: {
    flex: 1,
    fontSize: 10,
    textAlign: "center",
    alignItems: "center",
    marginLeft: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatar: {
    flex: 1,
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "#000000",
  }
});
