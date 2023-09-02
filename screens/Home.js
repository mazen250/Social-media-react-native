import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  FlatList,
  SafeAreaView,
  Platform,
  ActivityIndicator,
} from "react-native";
import React, { useState, useEffect, memo } from "react";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";
import { Foundation } from "@expo/vector-icons";
const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("https://dummyjson.com/posts");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const temp = await response.json();
        const posts = temp.posts;
        console.log(posts);
        fetchUsers(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    // Function to fetch users
    const fetchUsers = async (posts) => {
      try {
        const userResponse = await fetch("https://dummyjson.com/users");
        if (!userResponse.ok) {
          throw new Error("Failed to fetch users");
        }
        const temp = await userResponse.json();
        const users = temp.users;
        console.log(users);
        // Merge posts with user data based on userId
        const mergedData = posts.map((post) => ({
          ...post,
          user: users.find((user) => user.id === post.userId),
        }));
        setData(mergedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching users:", error);
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingRight: 20,
        }}
      >
        <Foundation
          name="social-blogger"
          size={40}
          color="white"
          style={{
            color: "white",
            // fontSize: 24,
            fontWeight: "bold",
            margin: 10,
            marginLeft: 20,
          }}
        />
        <Text>
          <AntDesign name="search1" size={24} color="white" />
        </Text>
      </View>
     
      {loading ? (
         <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
          <ActivityIndicator size={"large"} color={"white"} />
          </View>
      ) : (
        <FlatList
          data={data}
          renderItem={
            ({ item }) =>   <Pressable
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
          }
          keyExtractor={(item) => item.id}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#212121",
    paddingTop: Platform.OS === "android" ? 30 : 0,
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
});
