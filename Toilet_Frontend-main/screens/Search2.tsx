import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  FlatList,
  ScrollView,
  Image,
} from 'react-native'
import React, { useState } from 'react'
import {
  MagnifyingGlass,
  XCircle,
  Wheelchair,
  ForkKnife,
  Tote,
  GasPump,
  House,
  Star,
  Clock,
} from 'phosphor-react-native';
import wc from '../assets/wc.png';
import { searchToilet } from '../services/search'

const Search2 = () => {
  const [isLoading, setIsloading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [ResultPublic, setResultPublic] = useState([]);
  const [ResultPrivate, setResultPrivate] = useState([]);
  const [errorResult, setErrorResult] = useState("");

  const hardleSearch = async () => {
    setIsloading(true);
    try {
      setResultPublic([]);
      setResultPrivate([]);
      const toilets: any = await searchToilet(searchInput);
      // console.log(toilets.publicToilet);
      // console.log(toilets.privateToilet);
      setResultPublic(toilets.publicToilet);
      setResultPrivate(toilets.privateToilet);
    } catch (err: any) {
      setErrorResult(err.msg);
    }
    setIsloading(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.inner}>
          <TouchableOpacity style={styles.search} onPress={hardleSearch}>
            <MagnifyingGlass size={22} weight="bold" color="#777790" />
          </TouchableOpacity>
          <TextInput
            style={styles.field}
            placeholder='Search'
            onChangeText={text => setSearchInput(text)}
          />
          <TouchableOpacity style={styles.cancel}>
            <XCircle size={22} weight="fill" color="#BABCCA" />
          </TouchableOpacity>
        </View>
      </View>
      {isLoading ? (
        <ActivityIndicator />
      ) : ResultPublic.length > 0 ? (
        <View style={styles.contentContainer}>
          {
            ResultPublic.map((item:any) => 
              <View key={item._id} style={styles.content}>
                <View style={styles.itemLeftTop}>
                  <View style={styles.tagFree}>
                    <Text style={styles.textFree}>฿ Free</Text>
                  </View>
                  <View style={styles.tagHandicap}>
                    <Wheelchair
                      size={10}
                      weight="fill"
                      color="#00845A"
                      style={{
                        marginRight: 2,
                        marginLeft: 6,
                      }}
                    />
                    <Text style={styles.textHandicap}>Handicap access</Text>
                  </View>

                  <View style={styles.tagType}>
                    <Text style={styles.textType}>{item.type}</Text>
                  </View>
                </View>

                <Text style={styles.placeName}>{item.title}</Text>

                <View style={styles.itemBottom}>
                  <View style={styles.itemLeftBottom}>
                    <Clock
                      size={14}
                      weight="fill"
                      color="#31C596"
                      style={{
                        marginRight: 5,
                      }}
                    />
                    <Text style={styles.time}>
                      {item.timeOpen} - {item.timeClose}
                    </Text>
                  </View>
                  <View style={styles.itemRightBottom}>
                    <Star
                      size={14}
                      weight="fill"
                      color="#FBD17B"
                      style={{
                        marginRight: 2,
                      }}
                    />
                    <Text style={styles.rate}>5.0</Text>
                  </View>
                </View>
              </View>
            )
          }
        </View>
      ) : (
        <Text>{errorResult}</Text>
      )
      }
    </View>
  )
}

export default Search2

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5EAFA',
  },
  searchContainer: {
    marginHorizontal: 25,
    marginTop: 58,
    elevation: 3,
  },
  inner: {
    flexDirection: 'row',
  },
  search: {
    position: 'absolute',
    top: 8.5,
    left: 14,
    zIndex: 1,
  },
  field: {
    backgroundColor: '#fff',
    height: 39,
    width: '100%',
    borderRadius: 3,
    paddingHorizontal: 50,
    paddingVertical: 10,
    fontFamily: 'Fredoka-Regular',
  },
  cancel: {
    position: 'absolute',
    top: 8.5,
    right: 14,
    zIndex: 1,
  },


  contentContainer: {
    marginVertical: 20,
    backgroundColor: '#2C2F4A',
    borderRadius: 8,
    borderColor: '#ccc',
    paddingHorizontal: 14,
    paddingBottom: 14,
    paddingTop: 10
  },
  content: {
    width: '100%',
  },
  itemLeftTop: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },

  // Tag Free
  tagFree: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginRight: 12,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textFree: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#00845A',
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
  },

  // Tag Handicap
  tagHandicap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 15,
    marginRight: 12,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textHandicap: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#00845A',
    paddingRight: 6,
    paddingVertical: 2,
  },

  // Tag Type
  tagType: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    backgroundColor: '#CACCDA',
    borderRadius: 20,
  },
  textType: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 12,
    color: '#555568',
    marginLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
  },

  placeName: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#fff',
    marginBottom: 8,
  },

  itemBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeftBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  time: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    color: '#ABADBB',
  },
  itemRightBottom: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  rate: {
    fontFamily: 'Fredoka-Regular',
    fontSize: 14,
    color: '#fff',
  },
})