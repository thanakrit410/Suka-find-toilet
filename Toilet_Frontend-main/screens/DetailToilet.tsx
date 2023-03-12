import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import toilet from '../assets/toilet.jpg';
import {
  CaretLeft,
  Clock,
  Phone,
  Wheelchair,
  Heart,
  Star,
  CaretRight,
  PersonSimpleWalk,
  X,
  Key,
} from 'phosphor-react-native';
import wc from '../assets/wc.png';
import Review from '../components/Review';
import {RouteProp, useNavigation, useRoute} from '@react-navigation/native';
import {AddToiletParamList} from '../stacks/AddToiletStack';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {HomeParamList} from '../stacks/HomeStack';
import Modal from 'react-native-modal';
import star from '../assets/star.png';
import {TextInput} from 'react-native-paper';
import {getProfile} from '../services/auth';
import {createComment, getComment} from '../services/comment';
import AuthContext from '../context/AuthContext';
export interface IProfile {
  _id: string;
}

interface Comment {
  CreateBy: string;
  toiletId: string;
  comment: string;
  rate: number;
}

const {width} = Dimensions.get('window');
const aspectRatio = 360 / 400;
const height = width * aspectRatio;

const DetailToilet = () => {
  const {params} = useRoute<RouteProp<HomeParamList, 'DetailToilet'>>();
  console.log(params);
  const [ToiletId, setToiletId] = useState(params._id);
  const navigation = useNavigation<NativeStackNavigationProp<HomeParamList>>();
  const [comment, setComment] = useState<Comment[]>([]);
  const [modal, setModal] = useState(false);
  const [checkData, setCheckData] = useState('');
  const [profile, setProfile] = React.useState<IProfile>({
    _id: '',
  });
  const [review, setReview] = React.useState('');
  const {isLoggedIn, setLoggedIn} = useContext(AuthContext);
  const TagFree = (): JSX.Element | null => {
    if (params.free === true) {
      return (
        <View style={styles.tagFree}>
          <Text style={styles.textFree}>฿ Free</Text>
        </View>
      );
    } else {
      return null;
    }
  };
  const TagHandicap = (): JSX.Element | null => {
    if (params.handicap === true) {
      return (
        <View style={styles.tagHandicap}>
          <Wheelchair
            size={14}
            weight="fill"
            color="#00845A"
            style={{
              marginRight: 2,
              marginLeft: 6,
            }}
          />
          <Text style={styles.textHandicap}>Handicap access</Text>
        </View>
      );
    } else {
      return null;
    }
  };

  const submitCreateComment = async () => {
    const {data} = await getProfile();
    const createcomment: any = await createComment({
      createBy: data._id,
      toiletId: params._id,
      comment: review,
      rate: 5,
    });
    console.log('createcomment', createcomment);
    setModal(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const comments: any = await getComment(ToiletId);
        // console.log(comments.data);
        setComment(comments.Comment);
        setCheckData(comments.message);
      } catch (err: any) {
        setCheckData(err.message);
        console.log(err.message);
      }
    };
    fetchData();
  }, [modal]);

  const RenderComment = (): JSX.Element | null => {
    if (checkData === 'success') {
      return (
        <>
          {comment.map((item: any, index) => {
            return (
              <Review
                key={index}
                image={item.result[0].profile_picture}
                username={item.result[0].firstname}
                rating={item.rate}
                date={item.updatedAt}
                comment={item.comment}
              />
            );
          })}
        </>
      );
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <View style={{height: height * 0.4}}>
        <Image source={{uri: params.toiletpicture}} style={{width, height}} />
      </View>
      <TouchableOpacity
        style={styles.btnBack}
        onPress={() => navigation.goBack()}>
        <CaretLeft size={24} weight="bold" color="#2C2F4A" />
      </TouchableOpacity>

      <View>
        <ScrollView>
          <View style={{height: height * 0.5}}></View>
          <View style={styles.mainContainer}>
            <View style={styles.titleContainer}>
              <Text style={styles.title}>{params.title}</Text>
            </View>

            <View style={styles.tagContainer}>
              <TagFree></TagFree>
              <TagHandicap></TagHandicap>

              <View style={styles.tagType}>
                <Image source={wc} style={styles.iconType} />
                <Text style={styles.textType}>{params.type}</Text>
              </View>
            </View>

            <View style={styles.detailContainer}>
              <View style={styles.priceContainer}>
                <Text style={styles.baht}>฿ </Text>
                <Text style={styles.price}>0</Text>
              </View>
              <View style={styles.phoneContainer}>
                <Phone
                  size={16}
                  weight="fill"
                  color="#6D7DD3"
                  style={{
                    marginRight: 6,
                  }}
                />
                <Text style={styles.phone}>{params.contact}</Text>
              </View>
              <View style={styles.timeContainer}>
                <Clock
                  size={16}
                  weight="fill"
                  color="#31C596"
                  style={{
                    marginRight: 6,
                  }}
                />
                <Text style={styles.time}>
                  {params.timeOpen} - {params.timeClose}
                </Text>
              </View>
            </View>

            <View style={styles.btnContainer}>
              <TouchableOpacity
                style={styles.btnReview}
                onPress={() => setModal(true)}>
                <Text style={styles.review}>REVIEW</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnHeart}>
                <Heart size={20} weight="fill" color="#E5EAFA" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.btnPerson}>
                <PersonSimpleWalk size={20} weight="fill" color="#E5EAFA" />
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.btnRate}
              onPress={() => navigation.navigate('Ratings')}>
              <View style={styles.itemLeft}>
                <Text style={styles.titleRate}>Rate</Text>
                <Star size={17} weight="fill" color="#FAC353" />
                <Text style={styles.textRate}>4.5</Text>
                <Text style={styles.textReview}>(0 Reviews)</Text>
              </View>
              <CaretRight size={22} color="#2C2F4A" />
            </TouchableOpacity>

            <View style={styles.reviewContainer}>
              {/* <Review
                image={''}
                username={''}
                rating={0}
                date={''}
                comment={''}
              /> */}
              {/* <Review
                image={''}
                username={''}
                rating={0}
                date={''}
                comment={''}
              /> */}
              <RenderComment></RenderComment>
            </View>
          </View>
          <View
            style={{height: height * 0.25, backgroundColor: '#F4F6FD'}}></View>
        </ScrollView>
      </View>

      {/* Modal */}
      <Modal isVisible={modal}>
        <View style={styles.modalContainer}>
          <Image source={star} style={styles.imageStar} />

          <TouchableOpacity
            style={styles.btnClose}
            onPress={() => setModal(false)}>
            <X size={19} weight="bold" color="#2C2F4A" />
          </TouchableOpacity>

          <View style={styles.detailPopupContainer}>
            <Text style={styles.titlePopup}>Rate & Review</Text>
            <TouchableOpacity style={styles.btnStar}>
              <Star size={34} weight="fill" color="#FAC353" />
              <Star size={34} weight="fill" color="#FAC353" />
              <Star size={34} weight="fill" color="#FAC353" />
              <Star size={34} weight="fill" color="#FAC353" />
              <Star size={34} weight="bold" color="#FAC353" />
            </TouchableOpacity>
            <TextInput
              label="Review"
              value={review}
              theme={theme}
              style={styles.bgTextInput}
              mode="outlined"
              onChangeText={text => setReview(text)}
              multiline
            />
            <TouchableOpacity
              style={styles.btnSubmit}
              onPress={submitCreateComment}>
              <Text style={styles.textSubmit}>SUBMIT</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default DetailToilet;

const theme = {
  colors: {
    primary: '#6D7DD3',
  },
  fonts: {
    regular: {
      fontFamily: 'Fredoka-Regular',
    },
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  btnBack: {
    position: 'absolute',
    top: 25,
    left: 25,
    backgroundColor: '#F4F6FD',
    borderRadius: 30,
    padding: 10,
    elevation: 2,
  },
  mainContainer: {
    backgroundColor: '#F4F6FD',
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  titleContainer: {
    marginHorizontal: 25,
    marginTop: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Fredoka-SemiBold',
    color: '#2C2F4A',
  },

  // Tag
  tagContainer: {
    marginHorizontal: 25,
    marginTop: 12,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tagFree: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginRight: 16,
    paddingHorizontal: 2,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textFree: {
    fontSize: 14,
    fontFamily: 'Fredoka-Regular',
    color: '#00845A',
    paddingLeft: 6,
    paddingRight: 6,
    paddingVertical: 2,
  },
  tagHandicap: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    marginRight: 16,
    paddingHorizontal: 2,
    backgroundColor: '#0BF8AD',
    borderRadius: 20,
  },
  textHandicap: {
    fontSize: 14,
    fontFamily: 'Fredoka-Regular',
    color: '#00845A',
    paddingRight: 6,
    paddingVertical: 2,
  },
  tagType: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 12,
    paddingHorizontal: 2,
    backgroundColor: '#CACCDA',
    borderRadius: 20,
  },
  iconType: {
    width: 12,
    height: 12,
    marginRight: 2,
    marginLeft: 6,
    opacity: 0.6,
  },
  textType: {
    fontSize: 14,
    fontFamily: 'Fredoka-Regular',
    color: '#555568',
    paddingRight: 6,
    paddingVertical: 2,
  },

  // Detail
  detailContainer: {
    marginHorizontal: 25,
    marginTop: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  baht: {
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
    color: '#D75D5D',
  },
  price: {
    fontSize: 16,
    fontFamily: 'Fredoka-Regular',
    color: '#2C2F4A',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  time: {
    fontSize: 16,
    fontFamily: 'Fredoka-Regular',
    color: '#2C2F4A',
  },
  phoneContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  phone: {
    fontSize: 16,
    fontFamily: 'Fredoka-Regular',
    color: '#2C2F4A',
  },

  // Button
  btnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 15,
  },
  btnReview: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6D7DD3',
    width: '70%',
    height: 44,
    borderRadius: 8,
    elevation: 2,
  },
  btnHeart: {
    width: 44,
    height: 44,
    backgroundColor: '#2C2F4A',
    borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: '#777790',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnPerson: {
    width: 44,
    height: 44,
    backgroundColor: '#2C2F4A',
    borderRadius: 8,
    // borderWidth: 0.5,
    // borderColor: '#2C2F4A',
    elevation: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  review: {
    fontSize: 16,
    fontFamily: 'Fredoka-Medium',
    color: '#fff',
  },

  btnRate: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 25,
    marginTop: 25,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  titleRate: {
    fontSize: 20,
    fontFamily: 'Fredoka-Medium',
    color: '#2C2F4A',
    marginRight: 8,
  },
  textRate: {
    fontSize: 15,
    fontFamily: 'Fredoka-Regular',
    color: '#2C2F4A',
    marginLeft: 2,
    marginRight: 6,
  },
  textReview: {
    fontSize: 15,
    fontFamily: 'Fredoka-Regular',
    color: '#777790',
  },
  reviewContainer: {
    marginHorizontal: 25,
  },

  // Modal
  modalContainer: {
    backgroundColor: '#F4F6FD',
    borderRadius: 8,
    marginHorizontal: 20,
  },
  imageStar: {
    width: 330,
    height: 150,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  btnClose: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 32,
    height: 32,
    borderRadius: 20,
    backgroundColor: '#F4F6FD',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    opacity: 0.8,
  },
  detailPopupContainer: {
    paddingHorizontal: 20,
  },
  titlePopup: {
    fontSize: 22,
    fontFamily: 'Fredoka-Medium',
    color: '#2C2F4A',
    marginTop: 15,
    alignSelf: 'center',
  },
  btnStar: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 15,
  },
  bgTextInput: {
    backgroundColor: '#F4F6FD',
    marginTop: 15,
    fontFamily: 'Fredoka-Regular',
  },
  btnSubmit: {
    backgroundColor: '#6D7DD3',
    height: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 15,
    marginBottom: 20,
    elevation: 3,
  },
  textSubmit: {
    fontSize: 16,
    fontFamily: 'Fredoka-SemiBold',
    color: '#F4F6FD',
  },
});
