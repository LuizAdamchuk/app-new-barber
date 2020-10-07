import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import {
  Container,
  InputArea,
  CustomButtom,
  CustomButtonText,
  SignMessageButton,
  SignMessageButtonText,
  SignMessageButtonTextBold,
} from './style';
import AsyncStorage from '@react-native-community/async-storage';

import { UserContext } from '../../contexts/UserContext';
import SignInput from '../../components/SignInput';
import Api from '../../Api';
import preload from '../../assets/preload-img.png';

export const SignIn = () => {
  const { dispatch: userDispatch } = useContext(UserContext);
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignClick = async () => {
    if (email !== '' && password !== '') {
      let res = await Api.signIn(email.trim(), password.trim());

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
        alert('E-mail e/ou senha incorretos.');
      }
    } else {
      alert('Preencha os campos');
    }
  };
  const handleSignUp = () => {
    navigation.reset({ routes: [{ name: 'SignUp' }] });
  };

  return (
    <Container>
      <Image
        source={preload}
        style={{ height: 240, width: '100%', marginTop: 24 }}
      />
      <InputArea>
        <SignInput
          iconName="mail"
          iconColor="#268596"
          placeholder="Digite seu e-mail"
          value={email}
          onChangeText={setEmail}
        />
        <SignInput
          iconName="lock"
          iconColor="#268596"
          placeholder="Senha"
          value={password}
          onChangeText={setPassword}
          password
        />

        <CustomButtom onPress={handleSignClick}>
          <CustomButtonText>Login</CustomButtonText>
        </CustomButtom>
      </InputArea>
      <SignMessageButton onPress={handleSignUp}>
        <SignMessageButtonText>
          Ainda nao possui uma conta?
        </SignMessageButtonText>
        <SignMessageButtonTextBold>Clique aqui!</SignMessageButtonTextBold>
      </SignMessageButton>
    </Container>
  );
};
