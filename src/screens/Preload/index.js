import React, { useEffect, useContext } from 'react';
import { Image } from 'react-native';
import { Container, LoadingIcon } from './style';

import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';
import Api from '../../Api';
import preload from '../../assets/preload-img.png';
import { useNavigation } from '@react-navigation/native';

export const Preload = () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('@NewBarber:token');
      if (token) {
        let res = await Api.checkToken(token);
        if (res.token) {
          await AsyncStorage.setItem('@NewBarber:token', res.token);

          userDispatch({
            type: 'setAvatar',
            payload: {
              avatar: res.data.avatar,
            },
          });

          navigation.reset({ routes: [{ name: 'MainTab' }] });
        } else {
          navigation.navigate('SignIn');
        }
      } else {
        navigation.navigate('SignIn');
      }
    };
    checkToken();
  }, []);

  return (
    <Container>
      <Image source={preload} style={{ height: 256, width: '100%' }} />
      <LoadingIcon size="large" color="#fff" />
    </Container>
  );
};
