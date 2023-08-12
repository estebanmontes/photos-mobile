import { Image, View, StyleSheet } from 'react-native';

interface PictureProps {
  url: string;
  title: string;
}

export const Picture = ({ url, title }: PictureProps) => {
  return (
    <View style={styles.container}>
      <Image alt={title} style={styles.img} source={{ uri: url }} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    padding: 8,
  },
  img: {
    width: 360,
    borderRadius: 10,
    height: 300,
  },
});
