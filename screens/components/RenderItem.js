import { View, Text, Pressable, StyleSheet } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";
import { Image } from "react-native"
const RenderItem = ({ item, navigation }) => {
  return (
    <Pressable
      style={styles.post}
      onPress={() => navigation.navigate("SinglePost", { item })}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Image
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            marginRight: 10,
            backgroundColor: "white",
          }}
          source={{ uri: item.user?.image }}
        />
        <Text style={{ color: "white", fontSize: 24, fontWeight: "bold" }}>
          {item.user?.username}
        </Text>
      </View>

      <Text style={{ color: "white", fontSize: 19 }}>
        {item.title.length > 30
          ? item.title.substring(0, 30) + "..."
          : item.title}
      </Text>
      <Text style={{ color: "grey", fontSize: 16 }}>
        {item.body.length > 100
          ? item.body.substring(0, 100) + "..."
          : item.body}
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          marginTop: 10,
        }}
      >
        <AntDesign name="hearto" size={21} color="white" />
        <Text style={{ color: "white", fontSize: 16, marginLeft: 5 }}>
          {item.reactions}
        </Text>
      </View>
    </Pressable>
  );
};

export default RenderItem;

const styles = StyleSheet.create({
  post: {
    backgroundColor: "black",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    borderRadius: 10,
  },
});
