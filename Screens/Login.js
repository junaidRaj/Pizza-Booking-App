import {View, Text, TouchableOpacity, Alert, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import Styles from '../Screens/styles';
import SMinput from '../Components/SMinput';
import SMbutton from '../Components/SMbutton';
import auth from '@react-native-firebase/auth';
import Admin from './Card';

const Login = ({navigation}) => {
  const [loader, setLoader] = useState(false);
  const [model, setModel] = useState({});

  let LoginUser = () => {
    if (model.email === 'admin@gmail.com' && model.password === '123456') {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(model.email, model.password)
        .then(res => {
          let userId = res.user.uid;
          // console.log(userId);
          console.log('Successfully login');
          navigation.navigate('Admin', userId);
          setLoader(false);
        })
        .catch(err => {
          ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
          setLoader(false);
        });
    } else {
      setLoader(true);
      auth()
        .signInWithEmailAndPassword(model.email, model.password)
        .then(res => {
          let userId = res.user.uid;
          // console.log(userId);
          // console.log('Successfully login');
          navigation.navigate('Home', userId);
          setLoader(false);
        })
        .catch(err => {
          ToastAndroid.show('Wrong Email or Password', ToastAndroid.SHORT);
          setLoader(false);
        });
      // setLoader(false);
      // Alert.alert('validation', 'Enter Text Here...', [
      //   {
      //     text: 'okay',
      //     onPress: () => {
      //       console.log('On Press');
      //     },
      //   },
      // ]);
    }
  };

  return (
    <View style={[Styles.h100, Styles.bgPrimary, Styles.flexCenter]}>
      <Text style={[Styles.fs1, Styles.textWhite, Styles.textBold]}>Login</Text>
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
          <SMbutton isloading={loader} onPress={LoginUser} lable="Login" />
        </View>
        <View
          style={[Styles.p2, Styles.mt1, Styles.flexRow, Styles.flexCenter]}>
          <Text style={[Styles.textWhite, Styles.fs5]}>
            Are You New? Plaese
          </Text>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('SignUp');
            }}>
            <Text style={[Styles.textWhite, Styles.fs3, Styles.ms1]}>
              Register
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Login;
