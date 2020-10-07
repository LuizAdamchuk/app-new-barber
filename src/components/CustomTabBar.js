import React, { useContext } from 'react';
import styled from 'styled-components/native';

import { Feather } from '@expo/vector-icons';

import { UserContext } from '../contexts/UserContext';

import Colors from '../constants/Colors';

const TabArea = styled.View`
  height: 60px;
  background-color: ${Colors.primaryDarkIII};
  flex-direction: row;
`;
const TabItem = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
const TabItemCenter = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  justify-content: center;
  align-items: center;
  background-color: ${Colors.white};
  border-radius: 35px;
  border: 3px solid ${Colors.primaryDarkI};
  margin-top: -24px;
`;

const AvatarIcon = styled.Image`
  width: 32px;
  height: 32px;
  border-radius: 16px;
`;

export const CustomTabBar = ({ state, navigation }) => {
  const { state: user } = useContext(UserContext);
  const goTo = screenName => {
    navigation.navigate(screenName);
  };

  return (
    <TabArea>
      <TabItem onPress={() => goTo('Home')}>
        <Feather
          style={{ opacity: state.index === 0 ? 1 : 0.5 }}
          name="home"
          size={32}
          color={Colors.white}
        />
      </TabItem>
      <TabItem onPress={() => goTo('Search')}>
        <Feather
          style={{ opacity: state.index === 1 ? 1 : 0.5 }}
          name="search"
          size={32}
          color={Colors.white}
        />
      </TabItem>
      <TabItemCenter onPress={() => goTo('Appointments')}>
        <Feather
          style={{ opacity: state.index === 2 ? 0.5 : 1 }}
          name="calendar"
          size={32}
          color={Colors.primaryDarkI}
        />
      </TabItemCenter>
      <TabItem onPress={() => goTo('Favorites')}>
        <Feather
          style={{ opacity: state.index === 3 ? 1 : 0.5 }}
          name="star"
          size={32}
          color={Colors.white}
        />
      </TabItem>
      <TabItem onPress={() => goTo('Profile')}>
        {user.avatar !== '' ? (
          <AvatarIcon source={{ uri: user.avatar }} />
        ) : (
          <Feather
            style={{ opacity: state.index === 4 ? 1 : 0.5 }}
            name="settings"
            size={32}
            color={Colors.white}
          />
        )}
      </TabItem>
    </TabArea>
  );
};
