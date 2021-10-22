import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image, FlatList } from "react-native";
import yelp from "../api/yelp";

const ResultsShowScreen = ({ navigation }) => {
  const [result, setResult] = useState(null);
  const id = navigation.getParam("id");

  const getResult = async (id) => {
    const response = await yelp.get(`/${id}`);
    setResult(response.data);
  };

  useEffect(() => {
    getResult(id);
  }, []);

  // if ID not valid
  if (!result) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}> {result.name} </Text>
      <FlatList
        data={result.photos}
        keyExtractor={(photo) => photo}
        renderItem={({ item }) => {
          return <Image style={styles.image} source={{ uri: item }} />;
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
    container:{
        alignItems:'center'
    },
  image: {
    height: 200,
    width: 300,
    marginVertical: 10,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10
  },
});

export default ResultsShowScreen;
