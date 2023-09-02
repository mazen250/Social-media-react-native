import { View, Text, StyleSheet, Image, Pressable, ScrollView,ActivityIndicator } from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { AntDesign } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
const SinglePost = ({
  route: {
    params: { item },
  },
}) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: item.title || "Post",
    });
  }, [navigation]);

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);
  const getComments = async () => {
    try {
      axios
        .get(`https://dummyjson.com/posts/${item.id}/comments`)
        .then((response) => {
          setComments(response.data.comments);
        });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView>

     
      <View style={styles.post}>
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
          {item.title}
        </Text>
        <Text style={{ color: "grey", fontSize: 16 }}>
          {item.body}
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
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            color: "white",
            fontSize: 20,
            fontWeight: "600",
            marginLeft: 20,
            textDecorationLine: "underline",
          }}
        >
          Comments
        </Text>

        {loading ? (
          <View style={{flex:1,justifyContent:'center',alignItems:'center'}}>
            <Text style={{color:'white',fontSize:24,fontWeight:'bold'}}>Loading...</Text>
            <ActivityIndicator size="large" color="white" />
          </View>
        ) : comments.map((comment) => (
          <View style={styles.comment} key={comment.id}>
            <Text style={{ color: "white", fontSize: 24, fontWeight: "500" }}>
              <EvilIcons name="comment" size={24} color="white" />{" "}
              {comment.user?.username}
            </Text>
            <Text
              style={{
                marginLeft: 10,
                marginTop: 10,
                color: "white",
                fontSize: 16,
                fontWeight: "500",
              }}
            >
              {comment.body}
            </Text>
          </View>
        ))}
      </View></ScrollView>
    </View>
  );
};

export default SinglePost;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-start",
    // justifyContent: 'center',
    backgroundColor: "#212121",
  },
  post: {
    backgroundColor: "black",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    borderRadius: 10,
  },
  comment: {
    backgroundColor: "black",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderColor: "#b3b3b3",
    borderWidth: 1,
    borderRadius: 10,
  },
});
