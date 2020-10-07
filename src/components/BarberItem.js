import { useNavigation } from '@react-navigation/native';
import React from 'react';
import styled from 'styled-components/native';

import { Stars } from '../components/Stars';

import Colors from '../constants/Colors';

const ContainerBarberItem = styled.TouchableOpacity`
  background-color: ${Colors.white};
  margin-bottom: 16px;
  border-radius: 16px;
  padding: 16px;
  flex-direction: row;
`;
const Avatar = styled.Image`
  height: 88px;
  width: 88px;
  border-radius: 16px;
`;

const InfoArea = styled.View`
  margin-left: 16px;
  justify-content: space-between;
`;
const UserName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const ProfileButton = styled.View`
  width: 88px;
  height: 24px;
  border: 1px solid ${Colors.primaryDarkI};
  border-radius: 8px;
  justify-content: center;
  align-items: center;
`;
const ProfileButtonText = styled.Text`
  font-size: 12px;
  color: ${Colors.primaryDarkII};
`;

export const BarberItem = ({ data }) => {
  const navigation = useNavigation();
  const handleClick = () => {
    navigation.navigate('Barber', {
      id: data.id,
      avatar: data.avatar,
      name: data.name,
      stars: data.stars,
    });
  };

  return (
    <ContainerBarberItem onPress={handleClick}>
      <Avatar source={{ uri: data.avatar }} />
      <InfoArea>
        <UserName>{data.name}</UserName>

        <Stars stars={data.stars} showNumber />

        <ProfileButton>
          <ProfileButtonText>Ver perfil</ProfileButtonText>
        </ProfileButton>
      </InfoArea>
    </ContainerBarberItem>
  );
};
