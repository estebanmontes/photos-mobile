import { useRoute } from "@react-navigation/native";
import { ImageBackground, StyleSheet, Text, View } from "react-native";

const HomeScreen: React.FC = () => {
  const route = useRoute();
  const { image } = route.params;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{ uri: image.urls.regular }}
        style={styles.image}
      >
        <View style={styles.overlay}>
          <Text style={styles.date}>{image.date}</Text>
        </View>
        <View style={styles.header}>
          {image.title && (
            <Text style={styles.text}>{`Title: ${image.title}`}</Text>
          )}
          {image.instagram_username && (
            <Text
              style={styles.text}
            >{`Instagram username: ${image.instagram_username}`}</Text>
          )}
          <Text
            style={styles.text}
          >{`ALT desc: ${image.alt_description}`}</Text>
          <Text style={styles.text}>{`Likes: ${image.likes}`}</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
  },
  overlay: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  date: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  header: {
    display: "flex",
    top: 90,
    height: 120,
    width: "90%",
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10,
    position: "absolute",
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
  text: {
    color: "#fff",
    fontSize: 20,
    marginLeft: 12,
  },
});
export default HomeScreen;
