import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import Swiper from 'react-native-swiper';
import { Ionicons } from '@expo/vector-icons';

import {
  ContainerBarber,
  Scroller,
  SwipeDot,
  SwipeDotActive,
  SwipeItem,
  SwipeImage,
  FakeSwiper,
  UserAvatar,
  UserInfo,
  UserInfoName,
  UserFavButton,
  PageBody,
  UserInfoArea,
  ServiceArea,
  ServicesTitle,
  ServiceItem,
  ServiceInfo,
  ServiceName,
  ServicePrice,
  ServiceButton,
  ServiceButtonText,
  TestimonialArea,
  TestimonialItem,
  TestimonialInfo,
  TestimonialName,
  TestimonialBody,
  BackButton,
} from './style';
import { Stars } from '../../components/Stars';
import { BarberModal } from '../../components/BarberModal';
import Api from '../../Api';

export const Barber = () => {
  const navigation = useNavigation();
  const { params } = useRoute();
  const [loading, setLoading] = useState(false);

  const [favorited, setFavorited] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [userInfo, setUserInfo] = useState({
    id: params.id,
    avatar: params.avatar,
    name: params.name,
    stars: params.stars,
  });

  useEffect(() => {
    const getBarberInfo = async () => {
      setLoading(true);
      let json = await Api.getBarber(userInfo.id);

      if (json.error === '') {
        setUserInfo(json.data);
        setFavorited(json.data.favorited);
      } else {
        console.log(json.error);
      }
      setLoading(false);
    };
    getBarberInfo();
  }, []);

  const handleBackButton = () => {
    navigation.goBack();
  };

  const handleFavorite = async () => {
    setFavorited(!favorited);
    //API NAO TA LIBERADA
    const response = await Api.setFavorite(userInfo.id);
  };

  const handleService = k => {
    setSelectedService(k);
    setShowModal(true);
  };

  return (
    <ContainerBarber>
      <Scroller>
        {userInfo.photos && userInfo.photos.length > 0 ? (
          <Swiper
            style={{ height: 240 }}
            dot={<SwipeDot />}
            activeDot={<SwipeDotActive />}
            paginationStyle={{ top: 16, right: 16, bottom: null, left: null }}
            autoplay={true}
          >
            {userInfo.photos.map((i, k) => (
              <SwipeItem key={k}>
                <SwipeImage source={{ uri: i.url }} resizeMode="cover" />
              </SwipeItem>
            ))}
          </Swiper>
        ) : (
          <FakeSwiper />
        )}
        <PageBody>
          <UserInfoArea>
            <UserAvatar source={{ uri: userInfo.avatar }} />
            <UserInfo>
              <UserInfoName>{userInfo.name}</UserInfoName>
              <Stars stars={userInfo.stars} showNumber />
            </UserInfo>
            <UserFavButton onPress={handleFavorite}>
              {favorited ? (
                <Ionicons name="ios-heart" size={24} color="#63c2d1" />
              ) : (
                <Ionicons name="ios-heart-empty" size={24} color="#63c2d1" />
              )}
            </UserFavButton>
          </UserInfoArea>
          {loading && (
            <ActivityIndicator
              style={{ marginTop: 80 }}
              size="large"
              color="#63c2d1"
            />
          )}
          {userInfo.services && (
            <ServiceArea>
              <ServicesTitle>Lista de serviços</ServicesTitle>
              {userInfo.services.map((i, k) => (
                <ServiceItem key={k}>
                  <ServiceInfo>
                    <ServiceName>{i.name}</ServiceName>
                    <ServicePrice>R$ {i.price.toFixed(2)}</ServicePrice>
                  </ServiceInfo>
                  <ServiceButton onPress={() => handleService(k)}>
                    <ServiceButtonText>Agendar</ServiceButtonText>
                  </ServiceButton>
                </ServiceItem>
              ))}
            </ServiceArea>
          )}
          {userInfo.testimonials && userInfo.testimonials.length > 0 && (
            <TestimonialArea>
              <Swiper
                style={{ height: 110 }}
                showsPagination={false}
                showsButtons={true}
                prevButton={
                  <Ionicons name="ios-arrow-back" size={40} color="#258596" />
                }
                nextButton={
                  <Ionicons
                    name="ios-arrow-forward"
                    size={40}
                    color="#258596"
                  />
                }
              >
                {userInfo.testimonials.map((i, k) => (
                  <TestimonialItem key={k}>
                    <TestimonialInfo>
                      <TestimonialName>{i.name}</TestimonialName>
                      <Stars stars={i.rate} showNumber={false} />
                    </TestimonialInfo>
                    <TestimonialBody>{i.body}</TestimonialBody>
                  </TestimonialItem>
                ))}
              </Swiper>
            </TestimonialArea>
          )}
        </PageBody>
      </Scroller>
      <BackButton onPress={handleBackButton}>
        <Ionicons name="ios-arrow-dropleft-circle" size={40} color="#fff" />
      </BackButton>
      <BarberModal
        show={showModal}
        setShowModal={setShowModal}
        user={userInfo}
        service={selectedService}
      />
    </ContainerBarber>
  );
};
