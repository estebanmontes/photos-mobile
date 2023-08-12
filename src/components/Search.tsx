import { TextInput, View, StyleSheet } from 'react-native';

interface SearchProps {
  handleChange: (event: any) => void;
  searchTerm: string;
}

export const Search = ({ handleChange, searchTerm }: SearchProps) => {
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.search}
        placeholder={'Search ......'}
        value={searchTerm}
        onChangeText={(text: string) => handleChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    marginTop: 80,
  },
  search: {
    backgroundColor: '#fff',
    padding: 10,
    marginBottom: 26,
    borderRadius: 10,
    alignSelf: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    width: '100%',
    height: 60,
  },
});
