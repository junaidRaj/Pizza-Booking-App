import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  RefreshControl,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Styles from './styles';
import styles from './styles';
import database from '@react-native-firebase/database';

export default function BookData() {
  let [refresh, setRefresh] = useState(false);
  let [list, setList] = useState([]);
  let getData = () => {
    setRefresh(true);
    database()
      .ref('bookPizza/')
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
    <View style={[Styles.h100, Styles.bgPrimary]}>
      <View style={[Styles.w100]}>
        <Text
          style={[
            Styles.textWhite,
            Styles.textCenter,
            Styles.textBold,
            Styles.fs2,
            Styles.p2,
            Styles.bgBlack,
          ]}>
          BookData
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
                  styles.bgLight,
                  {padding: 4},
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
                  style={[
                    styles.textBlack,
                    styles.textCenter,
                    styles.textBold,
                  ]}>
                  Pizza Name : {x.PizzaName}
                </Text>
                <Text
                  style={[
                    styles.textBlack,
                    styles.textCenter,
                    styles.textBold,
                  ]}>
                  Pizza Details : {x.PizzaDetails}
                </Text>
                <Text
                  style={[
                    styles.textBlack,
                    styles.textCenter,
                    styles.textBold,
                  ]}>
                  Pizza Price : {x.PizzaPrice}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// import {View, Text, StyleSheet} from 'react-native';
// import React from 'react';
// import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';

// const Home = ({Navigation, route}) => {
//   let userId = route.params;
//   console.log(userId + 'Home ki id');
//   return (
//     <View>
//       <MapView
//         provider={PROVIDER_GOOGLE} // remove if not using Google Maps
//         style={{height: 500, width: '100%'}}
//         region={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.015,
//           longitudeDelta: 0.0121,
//         }}></MapView>
//     </View>
//   );
// };

// export default Home;
