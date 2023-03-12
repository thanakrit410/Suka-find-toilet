import { StyleSheet, Text, View, ActivityIndicator, FlatList } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import React, { useState } from 'react'
import { searchToilet } from '../services/search'

const Search = () => {
  const [isLoading, setIsloading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [ResultPublic, setResultPublic] = useState([]);
  const [ResultPrivate, setResultPrivate] = useState([]);
  const [errorResult, setErrorResult] = useState("");

  const hardleSearch = async () => {
    setIsloading(true);
    try {
      const toilets: any = await searchToilet(searchInput);
      console.log(toilets.publicToilet);
      console.log(toilets.privateToilet);
      setResultPublic(toilets.publicToilet);
      setResultPrivate(toilets.privateToilet);
    } catch (err:any) {
      setErrorResult(err.msg);
    }
    setIsloading(false);
  };
  return (
    <View>
      <Button mode="contained" onPress={() => console.log('Back')}>
        back
      </Button>
      <TextInput
        label="Search"
        value={searchInput}
        onChangeText={text => setSearchInput(text)}
      />
      <Button mode="contained" onPress={hardleSearch}>
        Search
      </Button>
      { isLoading ? (
        <ActivityIndicator />
        ) : ResultPublic?.length > 0 ? (
          <FlatList
            data={ResultPublic}
            keyExtractor={(item:any) => String(item._id)}
            renderItem={({item}) => 
              { return <Text> {item.title} </Text>}
            }
          />
        ) : (
          <Text>No results found</Text>
        )
      }
    </View>
  )
}

export default Search

const styles = StyleSheet.create({})