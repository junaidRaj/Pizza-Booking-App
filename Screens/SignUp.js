import {View, Text, TouchableOpacity, ToastAndroid, Alert} from 'react-native';
import React, {useState} from 'react';
import Styles from '../Screens/styles';
import SMinput from '../Components/SMinput';
import SMbutton from '../Components/SMbutton';
import auth from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';

const SignUp = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [model, setModel] = useState({});
  let signUpUser = () => {
    if (model.email && model.password) {
      setLoader(true);
      auth()
        .createUserWithEmailAndPassword(model.email, model.password)
        .then(res => {
          console.log(res);
          console.log(res.user.uid);
          database()
            .ref(`User/${res.user.uid}`)
            .set(model)
            .then(() => {
              setLoader(false);
              navigation.navigate('Login', res.user.uid);
            })
            .catch(err => {
              console.log(err);
            });
        })
        .catch(err => {
          setLoader(false);
          ToastAndroid.show('email or passward Wrong', ToastAndroid.SHORT);
          console.log(err);
        });
    } else {
      setLoader(false);
      Alert.alert('validation', 'Enter Text Here...', [
        {
          text: 'okay',
          onPress: () => {
            console.log('On Press');
          },
        },
      ]);
    }
  };

  return (
    <View style={[Styles.h100, Styles.bgPrimary, Styles.flexCenter]}>
      <Text style={[Styles.fs1, Styles.textWhite, Styles.textBold]}>
        SignUp
      </Text>
      <View style={[Styles.p2, Styles.w100]}>
        <View style={[Styles.w100, Styles.pt2]}>
          <SMinput
            onChangeText={e => setModel({...model, email: e})}
            lable="Email"
          />
        </View>
        <View style={[Styles.w100, Styles.pt2]}>
          <SMinput
            secureTextEntry={true}
            onChangeText={e => setModel({...model, password: e})}
            lable="Password"
          />
        </View>
        <View style={Styles.pt2}>
          <SMbutton isloading={loader} onPress={signUpUser} lable="SignUp" />
        </View>
        <View
          style={[Styles.p2, Styles.mt1, Styles.flexRow, Styles.flexCenter]}>
          <Text style={[Styles.textWhite, Styles.fs5]}>
            Already Acoount Plaese
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={[Styles.textWhite, Styles.fs3, Styles.ms1]}>
              Login
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignUp;
