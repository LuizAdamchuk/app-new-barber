import React, { useState, useContext } from 'react';
import { Image } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
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

import { UserContext } from '../../contexts/UserContext';
import SignInput from '../../components/SignInput';
import Api from '../../Api';
import preload from '../../assets/preload-img.png';

export const SignUp = () => {
  const navigation = useNavigation();
  const { dispatch: userDispatch } = useContext(UserContext);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignClick = async () => {
    if (name !== '' && email !== '' && password !== '') {
      let res = await Api.signUp(name.trim(), email.trim(), password.trim());
      console.log(res);

      if (res.token) {
        await AsyncStorage.setItem('@NewBarber:token', res.token);

        userDispatch({
          type: 'setAvatar',
          payload: {
            avatar: json.data.avatar,
          },
        });

        navigation.reset({ routes: [{ name: 'MainTab' }] });
      } else {
        alert('Erro ao cadastrar, tente novamente mais tarde.');
      }
    } else {
      alert('Preencha os campos');
    }
  };
  const handleSignIn = () => {
    navigation.reset({ routes: [{ name: 'SignIn' }] });
  };

  return (
    <Container>
      <Image
        source={preload}
        style={{ height: 240, width: '100%', marginTop: 24 }}
      />
      <InputArea>
        <SignInput
          iconName="user"
          iconColor="#268596"
          placeholder="Nome completo"
          value={name}
          onChangeText={setName}
        />
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
          <CustomButtonText>Cadastrar</CustomButtonText>
        </CustomButtom>
      </InputArea>
      <SignMessageButton onPress={handleSignIn}>
        <SignMessageButtonTextBold>
          Já possui uma conta?
        </SignMessageButtonTextBold>
        <SignMessageButtonText>Faça login</SignMessageButtonText>
      </SignMessageButton>
    </Container>
  );
};
