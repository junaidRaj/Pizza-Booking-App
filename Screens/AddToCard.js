import {View, Text, TouchableOpacity, Image, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import styles from './styles';
import {ScrollView} from 'react-native-gesture-handler';
import SMbutton from '../Components/SMbutton';
import database from '@react-native-firebase/database';

export default function AddToCard({navigation, route}) {
  let obj = route.params;
  let [loder, setLoader] = useState(false);
  let sendData = () => {
    setLoader(true);
    obj.id = database().ref(`bookPizza/`).push().key;
    database()
      .ref(`bookPizza/${obj.id}`)
      .set(obj)
      .then(() => {
        setLoader(false);
        ToastAndroid.show('Order has Been Recieved', ToastAndroid.SHORT);
        // console.log('Book data send');
      })
      .catch(err => {
        setLoader(false);
        console.log(err);
      });
  };
  return (
    <View style={[styles.h100, styles.bgPrimary]}>
      <Text
        style={[
          styles.textCenter,
          styles.fs1,
          styles.textBold,
          styles.textWhite,

          styles.bgBlack,
          styles.p1,
        ]}>
        AddToCard
      </Text>
      <ScrollView>
        <View style={[styles.p2]}>
          <TouchableOpacity>
            <View
              style={[
                styles.bgLight,
                {padding: 4},
                {
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 12,
                  },
                  shadowOpacity: 0.58,
                  shadowRadius: 16.0,

                  elevation: 24,
                },
                styles.mb2,
                styles.rounded,
              ]}>
              <Image
                style={{height: 170, width: '100%'}}
                source={{
                  uri: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
                }}
              />
              <Text
                style={[styles.textBlack, styles.textCenter, styles.textBold]}>
                Pizza Name : {obj.PizzaName}
              </Text>
              <Text
                style={[styles.textBlack, styles.textCenter, styles.textBold]}>
                Pizza Details : {obj.PizzaDetails}
              </Text>
              <Text
                style={[styles.textBlack, styles.textCenter, styles.textBold]}>
                Pizza Price : {obj.PizzaPrice}
              </Text>
              <SMbutton isloading={loder} onPress={sendData} lable="Buy Now" />
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
