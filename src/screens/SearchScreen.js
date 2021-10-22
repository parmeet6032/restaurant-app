import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

import ResultsList from "../components/ResultsList";
import SearchBar from "../components/SearchBar";

import useResults from "../hooks/useResults";

const SearchScreen = ({ navigation }) => {
  // console.log(props); // navigation present in "props"
  const [term, setTerm] = useState("");
  const [searchApi, results, errorMessage] = useResults();

  const filterResultsByPrice = (price) => {
    // price === '$' || '$$' || '$$$'
    return results.filter((result) => {
      return result.price === price;
    });
  };

  // flex makes View to take all available display view area
  // below code will also work
  //   <View style={{ borderColor: "red", borderWidth: 10, flex: 1 }}></View>
  // alternative, make a nameless tag
  return (
    <>
      <SearchBar
        term={term}
        // onTermChange={(newTerm) => setTerm(newTerm)}
        onTermChange={setTerm}
        onTermSubmit={() => searchApi(term)}
      />

      {/* error message, if any error occurs */}
      {errorMessage ? <Text>{errorMessage}</Text> : null}
      {/* <Text>We have found: {results.length} results</Text> */}

      <ScrollView>
        <ResultsList
          results={filterResultsByPrice("$")}
          title="Cost Effective"
          navigation={navigation}
        />
        <ResultsList
          results={filterResultsByPrice("$$")}
          title="Bit Pricier"
          navigation={navigation}
        />
        <ResultsList
          results={filterResultsByPrice("$$$")}
          title="Big Spender"
          navigation={navigation}
        />
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({});

export default SearchScreen;
