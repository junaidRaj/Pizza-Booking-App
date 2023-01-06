import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import Styles from './styles';
import SMinput from '../Components/SMinput';
import SMbutton from '../Components/SMbutton';
import database from '@react-native-firebase/database';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export default function Admin({navigation, route}) {
  const [loader, setLoader] = useState(false);
  const [list, setList] = useState([]);
  let userId = route.params;
  // console.log(route.params);
  // console.log(userId + 'me admin ki ho');

  const [model, setModel] = useState({});
  const [PizzaName, setPizzaName] = useState('');
  const [PizzaDetails, setPizzaDetails] = useState('');
  const [PizzaPrice, setPizzaPrice] = useState('');
  let sendData = () => {
    setLoader(true);
    model.id = database().ref(`PizzaData/${userId}`).push().key;
    database()
      .ref(`PizzaData/${model.id}`)
      .set(model)
      .then(() => {
        setLoader(false);
        // console.log('Data succesfull Send');
      })
      .catch(err => {
        console.log(err);
      });
    setPizzaName('');
    setPizzaDetails('');
    setPizzaPrice('');
  };
  let getData = () => {
    database()
      .ref('PizzaData/')
      .once('value', dt => {
        let li = Object.values(dt.val());
        setList([...li]);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const deletePatient = x => {
    database().ref(`PizzaData/${x.id}`).remove();
  };

  const EditPizza = x => {
    setModel({
      PizzaName: x.PizzaName,
      PizzaDetails: x.PizzaDetails,
      PizzaPrice: x.PizzaPrice,
    });
    setPizzaName(x.PizzaName);
    setPizzaDetails(x.PizzaDetails);
    setPizzaPrice(x.PizzaPrice);
    console.log(x);
  };

  let updatePizza = x => {
    database()
      .ref(`PizzaData/${x.id}`)
      .set(model)
      .then(() => {
        console.log('data update');
      })
      .catch(err => {
        console.log(err);
      });
    setPizzaName('');
    setPizzaDetails('');
    setPizzaPrice('');
  };

  let OpenCamera = () => {
    launchCamera({mediaType: 'photo', includeBase64: true}, res => {
      console.log(res);
    });
  };
  let OpenGallery = () => {
    launchImageLibrary({mediaType: 'photo', includeBase64: true}, res => {
      console.log(res);
    });
  };
  return (
    <View style={[Styles.h100, Styles.bgPrimary]}>
      <Text
        style={[
          Styles.p2,
          Styles.textWhite,
          Styles.textBold,
          Styles.fs2,
          Styles.textCenter,
          Styles.bgBlack,
        ]}>
        Book Pizza
      </Text>
      <ScrollView style={Styles.h100}>
        <View style={[Styles.p2, Styles.mb1]}>
          <View style={[Styles.w100]}>
            <SMinput
              value={PizzaName}
              onChangeText={e => {
                setPizzaName(e);
                setModel({...model, PizzaName: e});
              }}
              lable="Pizza Name"
            />
          </View>
          <View style={[Styles.w100, Styles.py1]}>
            <SMinput
              value={PizzaDetails}
              onChangeText={e => {
                setPizzaDetails(e);
                setModel({...model, PizzaDetails: e});
              }}
              lable="Pizza Details"
            />
          </View>
          <View style={[Styles.w100]}>
            <SMinput
              value={PizzaPrice}
              onChangeText={e => {
                setPizzaPrice(e);
                setModel({...model, PizzaPrice: e});
              }}
              lable="Pizza Price"
            />
          </View>
          <View style={Styles.py1}>
            <SMbutton isloading={loader} onPress={sendData} lable="Submit" />
          </View>
          <View style={Styles.py1}>
            <SMbutton onPress={OpenCamera} lable="Camera" />
          </View>
          <View style={Styles.py1}>
            <SMbutton onPress={OpenGallery} lable="Gallery" />
          </View>
          <View style={Styles.py1}>
            <SMbutton
              onPress={e => {
                navigation.navigate('bookData');
              }}
              lable="Booking Data"
            />
          </View>

          {list.map((x, i) => (
            <TouchableOpacity key={i}>
              <View
                style={[Styles.p2, Styles.mb1, Styles.bgLight, Styles.rounded]}>
                <Text style={[Styles.textBlack, Styles.fs5, Styles.textBold]}>
                  Pizza Name : {x.PizzaName}
                </Text>
                <Text style={[Styles.textBlack, Styles.fs5, Styles.textBold]}>
                  Pizza Details : {x.PizzaDetails}
                </Text>
                <Text style={[Styles.textBlack, Styles.fs5, Styles.textBold]}>
                  Pizza Price : {x.PizzaPrice}
                </Text>
                <View style={[Styles.flexRow, Styles.pt1]}>
                  <View style={[Styles.w50, Styles.me1]}>
                    <SMbutton onPress={() => deletePatient(x)} lable="delete" />
                  </View>
                  <View style={[Styles.w50]}>
                    <SMbutton onPress={() => EditPizza(x)} lable="edit" />
                  </View>
                </View>
                <View style={[Styles.pt1, Styles.ms3]}>
                  <SMbutton
                    isloading={loader}
                    onPress={() => updatePizza(x)}
                    customStyle={Styles.me5}
                    lable="Update"
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
