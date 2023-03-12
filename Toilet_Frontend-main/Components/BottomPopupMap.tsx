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
  Pressable,
} from 'react-native';
import Switch from '../components/Switch';
import Switch2 from '../components/Switch2';
import {
  Wheelchair,
  ForkKnife,
  Tote,
  GasPump,
  House,
  Circle,
  CheckCircle,
} from 'phosphor-react-native';
import wc from '../assets/wc.png';

interface IPop {
  show: boolean;
  close: () => void;
  data: any;
  title: string;
  onSelected: (value: string) => void;
  onSelectedFree: (value: boolean) => void;
  onSelectedHandicap: (value: boolean) => void;
}
const deviceHeight = Dimensions.get('window').height;
const BottomPopupMap = (props: IPop) => {
  const [type, setType] = React.useState('All');
  //   const close = () => {
  //     setShow(false);
  //   };
  const [free, setFree] = React.useState(false);
  const [handicap, setHandicap] = React.useState(false);
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
      <View>
        <Text
          style={{
            fontFamily: 'Fredoka-SemiBold',
            fontSize: 18,
            color: '#2C2F4A',
            marginVertical: 16,
            alignSelf: 'center',
          }}>
          {props.title}
        </Text>
      </View>
    );
  };

  const renderSwitchFreeHandicap = () => {
    return (
      <View style={{marginHorizontal: 20}}>
        <View style={styles.itemFree}>
          <View style={styles.itemLeftFree}>
            <Text style={styles.txtBaht}>฿</Text>
            <Text style={styles.txtFree}>Free</Text>
          </View>
          <Switch
            inActiveColor={'#BABCCA'}
            activeColor={'#31C596'}
            active={free}
            onPress={() => setFree(prev => !prev)}
          />
        </View>

        <View style={styles.itemHandicap}>
          <View style={styles.itemLeftHandicap}>
            <Wheelchair size={20} color="#2C2F4A" weight="fill" />
            <Text style={styles.txtHandicap}>Handicap</Text>
          </View>
          <Switch2
            inActiveColor={'#BABCCA'}
            activeColor={'#31C596'}
            active={handicap}
            onPress={() => setHandicap(prev => !prev)}
          />
        </View>
      </View>
    );
  };

  const renderTitle2 = () => {
    return (
      <View>
        <View style={styles.line} />
        <View style={{marginHorizontal: 20}}>
          <Text style={styles.title2}>Type of location</Text>   
        </View>
      </View>
    );
  };

  const renderItem = ({item}: any) => {
    return (
      <TouchableOpacity
        onPress={() => setType(item.name)}
        style={{
          height: 46,
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
            marginHorizontal: 20,
          }}>
          {item.icon}
          <Text
            style={{
              fontFamily: 'Fredoka-Medium',
              fontSize: 16,
              color: '#2C2F4A',
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

  const renderBtn = () => {
    return (
      <View style={{marginHorizontal: 20}}>
        {/* <TouchableOpacity style={styles.btnContainer} onPress={()=>props.onSelectedFree(free)}> */}
        {/* <TouchableOpacity style={styles.btnContainer} onPress={()=>props.onSelected(type)}> */}
        <TouchableOpacity style={styles.btnContainer} onPress={()=>{props.onSelectedHandicap(handicap),props.onSelectedFree(free),props.onSelected(type)}}>
          <Text style={styles.txtBtnSubmit}>SUBMIT</Text>
        </TouchableOpacity>
        {/* </TouchableOpacity>
        </TouchableOpacity> */}
      </View>
    );
  };

  const renderContent = () => {
    return (
      <View>
        <FlatList
          style={{marginBottom: 5}}
          showsVerticalScrollIndicator={false}
          data={props.data}
          renderItem={renderItem}
          extraData={props.data}
          keyExtractor={(item, index) => index.toString()}
          // ItemSeparatorComponent={RenderSeparator}
          // contentContainerStyle={{
          //   paddingBottom: 0,
          // }}
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
            maxHeight: deviceHeight * 0.9,
          }}>
          {renderTitle()}
          {renderSwitchFreeHandicap()}
          {renderTitle2()}
          {renderContent()}
          {renderBtn()}
          {/* {renderContent()}
          <TouchableOpacity onPress={()=>props.onSelected("All")}>
          <Pressable style={styles.contentContainer} onPress={() => setType('All')}>
            <Text style={styles.txtAll}>ALL</Text>
            {type === 'All' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold" color='#6D7DD3' />
            )}
          </Pressable>
          </TouchableOpacity>
          <Pressable style={styles.contentContainer} onPress={() => setType('Public')}>
            <Text style={styles.txtAll}>Public</Text>
            {type === 'Public' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold" color='#6D7DD3' />
            )}
          </Pressable>
          <Pressable style={styles.contentContainer} onPress={() => setType('Restaurant')}>
            <Text style={styles.txtAll}>Restaurant</Text>
            {type === 'Restaurant' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold" color='#6D7DD3' />
            )}
          </Pressable>
          <Pressable style={styles.contentContainer} onPress={() => setType('Store')}>
            <Text style={styles.txtAll}>Store</Text>
            {type === 'Store' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold"color='#6D7DD3' />
            )}
          </Pressable>
          <Pressable style={styles.contentContainer} onPress={() => setType('Gas Station')}>
            <Text style={styles.txtAll}>Public</Text>
            {type === 'Gas Station' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold" color='#6D7DD3' />
            )}
          </Pressable>
          <Pressable style={styles.contentContainer} onPress={() => setType('House')}>
            <Text style={styles.txtAll}>House</Text>
            {type === 'House' ? (
              <CheckCircle size={24} weight="fill" color='#6D7DD3' />
            ) : (
              <Circle size={24} weight="bold" color='#6D7DD3' />
            )}
          </Pressable> */}
        </View>
      </View>
    </Modal>
  );
};
export default BottomPopupMap;

const styles = StyleSheet.create({
  itemFree: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  itemLeftFree: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtBaht: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 20,
    color: '#2C2F4A',
    marginRight: 20,
  },
  txtFree: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#2C2F4A',
  },

  itemHandicap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 20,
  },
  itemLeftHandicap: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  txtHandicap: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#2C2F4A',
    marginLeft: 10,
  },

  line: {
    height: 1,
    backgroundColor: '#E5E5E5',
    marginTop: 10,
    marginBottom: 25,
  },
  title2: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 18,
    color: '#777790',
    marginBottom: 25,
  },

  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 20,
  },
  txtAll: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#2C2F4A',
  },
  
  btnContainer: {
    height: 44,
    backgroundColor: '#6D7DD3',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    marginBottom: 15,
  },
  txtBtnSubmit: {
    fontFamily: 'Fredoka-Medium',
    fontSize: 16,
    color: '#fff',
  },
});
