import React, {useState} from 'react';
import {
  Modal,
  Dimensions,
  TouchableWithoutFeedback,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
interface IPop {
  show: boolean;
  close: () => void;
  title: string;
  data: any;
  onSelected: (value: string) => void;
}
const deviceHeight = Dimensions.get('window').height;
const BottomPopup = (props: IPop) => {
  //   const close = () => {
  //     setShow(false);
  //   };

  const renderOutsideTouchable = (onTouch: any) => {
    const view = <View style={{flex: 1, width: '100%'}} />;
    if (!onTouch) return view;

    return (
      <TouchableWithoutFeedback
        onPress={onTouch}
        style={{flex: 1, width: '100%'}}>
        {view}
      </TouchableWithoutFeedback>
    );
  };
  const renderTitle = () => {
    return (
      <View style={{marginHorizontal: 16}}>
        <Text
          style={{
            fontFamily: 'Fredoka-Medium',
            fontSize: 20,
            color: '#777790',
            marginVertical: 28,
          }}>
          {props.title}
        </Text>
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => props.onSelected(item.name)}
        style={{
          height: 48,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'flex-start',
        }}>
        <View
          style={{
            height: 50,
            flex: 1,
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'center',
            marginLeft: 20,
          }}>
            {item.icon}
          <Text
            style={{
              fontFamily: 'Fredoka-Regular',
              fontSize: 18,
              color: '#2C2F4A',
              marginLeft: 12,
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  // const RenderSeparator = () => {
  //   return (
  //     <View
  //       style={{
  //         opacity: 0.1,
  //         backgroundColor: '#182E44',
  //         height: 1,
  //       }}
  //     />
  //   );
  // };

  const renderContent = () => {
    return (
      <View>
        <FlatList
          style={{marginBottom: 20}}
          showsVerticalScrollIndicator={false}
          data={props.data}
          renderItem={renderItem}
          extraData={props.data}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={RenderSeparator}
          contentContainerStyle={{
            paddingBottom: 20,
          }}
        />
      </View>
    );
  };

  // let {show} = this.state
  // const {onTouchOutside, title} = this.props

  return (
    <Modal
      animationType={'fade'}
      transparent={true}
      visible={props.show}
      onRequestClose={props.close}>
      <View
        style={{
          flex: 1,
          backgroundColor: '#000A',
          justifyContent: 'flex-end',
        }}>
        {renderOutsideTouchable(props.close)}
        <View
          style={{
            backgroundColor: '#fff',
            width: '100%',
            borderTopRightRadius: 20,
            borderTopLeftRadius: 20,
            paddingHorizontal: 16,
            maxHeight: deviceHeight * 0.46,
          }}>
          {renderTitle()}
          {renderContent()}
        </View>
      </View>
    </Modal>
  );
};
export default BottomPopup;
