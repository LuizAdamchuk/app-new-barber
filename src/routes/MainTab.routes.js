import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Home } from '../screens/Home';
import { Favorites } from '../screens/Favorites';
import { Profile } from '../screens/Profile';
import { Search } from '../screens/Search';
import { Appointments } from '../screens/Appointments';

import { CustomTabBar } from '../components/CustomTabBar';

const { Navigator, Screen } = createBottomTabNavigator();

export const MainTab = () => (
  <Navigator tabBar={props => <CustomTabBar {...props} />}>
    <Screen name="Home" component={Home} />
    <Screen name="Search" component={Search} />
    <Screen name="Appointments" component={Appointments} />
    <Screen name="Favorites" component={Favorites} />
    <Screen name="Profile" component={Profile} />
  </Navigator>
);
