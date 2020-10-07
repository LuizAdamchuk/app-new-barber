import React from 'react';
import { Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { Container } from './style';

import Api from '../../Api';

export const Profile = () => {
  const navigation = useNavigation();

  const handleSignOut = async () => {
    await Api.signOut();
    navigation.reset({
      routes: [{ name: 'SignIn' }],
    });
  };
  return (
    <Container>
      <Text>Profile</Text>
      <Button title="Sair" onPress={handleSignOut} />
    </Container>
  );
};
