import { FlatList, Text, TouchableOpacity } from "react-native";

interface PictureProps {
  handlePress: (e: string) => void;
  data: any[];
  filter: string;
}

export const Filter = ({ data, handlePress, filter }: PictureProps) => (
  <FlatList
    data={data}
    contentContainerStyle={{ flexGrow: 1, alignItems: "center", margin: 12 }}
    renderItem={({ item: e, index }) => (
      <TouchableOpacity
        key={index}
        onPress={() => handlePress(e)}
        style={{
          backgroundColor: "#fff",
          padding: 4,
          width: 90,
          height: 40,
          borderRadius: 5,
          margin: 4,
        }}
      >
        <Text style={{ color: "#000", fontSize: 12 }}>
          {filter === e.value ? "✓ " : ""}
          {e.name}
        </Text>
      </TouchableOpacity>
    )}
    keyExtractor={(_, index) => index.toString()}
    horizontal
  />
);
