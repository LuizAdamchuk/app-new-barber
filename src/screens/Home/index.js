import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { Alert, ActivityIndicator, RefreshControl } from 'react-native';
import * as Location from 'expo-location';

import {
  Container,
  Scroller,
  HeaderArea,
  HeaderTitle,
  SearchButton,
  LocationArea,
  LocationInput,
  LocationFinder,
  ListArea,
} from './style';

import { BarberItem } from '../../components/BarberItem';
import Api from '../../Api';

export const Home = () => {
  const navigation = useNavigation();

  const [locationText, setLocationText] = useState('');
  const [cordinates, setCordinates] = useState(null);
  const [cordinatesSubmiting, setCordinatesSubmiting] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [errorMsg, setErrorMsg] = useState(null);
  const [barberList, setBarberList] = useState([]);

  useEffect(() => {
    getBarbers();
  }, []);

  const onRefresh = () => {
    setRefreshing(false);
    getBarbers();
  };

  const handleLocationFinder = async () => {
    setCordinates(null);
    setCordinatesSubmiting(true);
    setLoading(true);
    setLocationText('');
    setBarberList([]);
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      setErrorMsg('Permission to access location was denied');
    }

    let location = await Location.getCurrentPositionAsync({});
    setCordinates(location);

    if (errorMsg) {
      Alert.alert(errorMsg);
    }
    getBarbers();
    setCordinatesSubmiting(false);
  };

  const getBarbers = async () => {
    setLoading(true);
    setBarberList([]);

    let lat = null;
    let lng = null;

    if (cordinates) {
      lat = cordinates.latitude;
      lng = cordinates.longitude;
    }

    let res = await Api.getBarbers(lat, lng, locationText);

    if (res.error === '') {
      if (res.loc) {
        setLocationText(res.loc);
      }
      setBarberList(res.data);
    } else {
      console.log(res.error);
    }
    setLoading(false);
  };

  const handleLocationSearch = () => {
    setCordinates({});
    getBarbers();
  };

  return (
    <Container>
      <Scroller
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <HeaderArea>
          <HeaderTitle numberOfLines={2}>
            Encontre o seu barbeiro favorito
          </HeaderTitle>
          <SearchButton onPress={() => navigation.navigate('Search')}>
            <Feather name="search" size={32} color="#fff" />
          </SearchButton>
        </HeaderArea>
        <LocationArea>
          <LocationInput
            placeholder="Onde você está?"
            placeholderTextColor="#fff"
            value={locationText}
            onChangeText={setLocationText}
            onEndEditing={handleLocationSearch}
          />
          <LocationFinder onPress={handleLocationFinder}>
            {cordinatesSubmiting ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Feather name="map-pin" size={24} color="#fff" />
            )}
          </LocationFinder>
        </LocationArea>
        {loading && (
          <ActivityIndicator
            style={{ marginTop: 80 }}
            size="large"
            color="#fff"
          />
        )}
        <ListArea>
          {barberList.map((item, index) => (
            <BarberItem key={index} data={item} />
          ))}
        </ListArea>
      </Scroller>
    </Container>
  );
};
