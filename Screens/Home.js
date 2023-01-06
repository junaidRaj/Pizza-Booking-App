import {
  View,
  Text,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import styles from './styles';
import database from '@react-native-firebase/database';
import {ScrollView} from 'react-native-gesture-handler';
import SMbutton from '../Components/SMbutton';

export default function Home({navigation, route}) {
  let userId = route.params;
  const [list, setList] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let getData = () => {
    setRefresh(true);
    database()
      .ref('PizzaData/')
      .once('value', dt => {
        let li = Object.values(dt.val());
        setList([...li]);
        setRefresh(false);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  let abc = () => {
    setRefresh(true);
    setTimeout(() => {
      setRefresh(false);
    }, 6000);
  };
  return (
    <View style={[styles.h100, styles.bgPrimary]}>
      <View>
        <Text
          style={[
            styles.textWhite,
            styles.fs3,
            styles.textCenter,
            styles.textBold,
            styles.bgBlack,
            styles.p2,
          ]}>
          Eat Your Pizza
        </Text>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl onRefresh={abc} refreshing={refresh} />
        }>
        <View style={[styles.p2]}>
          {list.map((x, i) => (
            <TouchableOpacity key={i}>
              <View
                style={[
                  styles.flexRow,
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
                <View style={[styles.w50]}>
                  <Image
                    style={{height: 170, width: '100%'}}
                    source={{
                      uri: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg?auto=compress&cs=tinysrgb&w=600',
                    }}
                  />
                </View>
                <View style={[styles.w50]}>
                  <Text
                    style={[
                      styles.textBlack,
                      styles.fs5,
                      styles.ms2,
                      styles.textBold,
                    ]}>
                    {x.PizzaName}
                  </Text>

                  <Text
                    style={[
                      styles.textBlack,
                      styles.fs5,
                      styles.ms2,
                      styles.textBold,
                    ]}>
                    Rs / {x.PizzaPrice}
                  </Text>
                  <Text
                    style={[
                      styles.textBlack,
                      styles.fs5,
                      styles.ms2,
                      styles.textBold,
                    ]}>
                    {x.PizzaDetails}
                  </Text>
                  <SMbutton
                    customStyle={styles.mt2}
                    onPress={e => {
                      navigation.navigate('AddToCard', x);
                    }}
                    lable="Buy Now"
                  />
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}
