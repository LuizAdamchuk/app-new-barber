import styled from 'styled-components/native';

import Colors from '../../constants/Colors';

export const ContainerBarber = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.white};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
`;
export const SwipeDot = styled.View`
  height: 10px;
  width: 10px;
  background-color: ${Colors.white};
  border-radius: 5px;
  margin: 3px;
`;
export const SwipeDotActive = styled.View`
  height: 10px;
  width: 10px;
  background-color: ${Colors.black};
  border-radius: 5px;
  margin: 3px;
`;
export const SwipeItem = styled.View`
  flex: 1;
  background-color: ${Colors.primary};
`;
export const SwipeImage = styled.Image`
  width: 100%;
  height: 240px;
`;
export const FakeSwiper = styled.View`
  height: 136px;
  background-color: ${Colors.primary};
`;
export const PageBody = styled.View`
  background-color: ${Colors.white};
  border-top-left-radius: 48px;
  margin-top: -48px;
`;
export const UserInfoArea = styled.View`
  flex-direction: row;
  margin-top: -32px;
`;
export const UserAvatar = styled.Image`
  height: 112px;
  width: 112px;
  border-radius: 16px;
  margin-left: 32px;
  margin-right: 16px;
  border-width: 4px;
  border-color: ${Colors.white};
`;
export const UserInfo = styled.View`
  flex: 1;
  justify-content: flex-end;
`;
export const UserInfoName = styled.Text`
  color: ${Colors.black};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 8px;
`;
export const UserFavButton = styled.TouchableOpacity`
  height: 40px;
  width: 40px;
  background-color: ${Colors.white};
  border: 2px solid ${Colors.primary};
  border-radius: 20px;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
  margin-right: 24px;
  margin-left: 16px;
`;
export const ServiceArea = styled.View`
  margin-top: 32px;
`;
export const ServicesTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: ${Colors.primaryDarkII};
  margin-bottom: 16px;
  margin-left: 24px;
`;
export const ServiceItem = styled.View`
  flex-direction: row;
  margin-left: 24px;
  margin-right: 24px;
  margin-bottom: 16px;
`;
export const ServiceInfo = styled.View`
  flex: 1;
`;
export const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.primaryDarkII};
`;
export const ServicePrice = styled.Text`
  font-size: 14px;
  color: ${Colors.primaryDarkII};
`;
export const ServiceButton = styled.TouchableOpacity`
  padding: 12px 16px;
  border-radius: 12px;
  background-color: ${Colors.primaryDarkI};
`;
export const ServiceButtonText = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: ${Colors.white};
`;

export const TestimonialArea = styled.View`
  margin-top: 32px;
  margin-bottom: 48px;
`;
export const TestimonialItem = styled.View`
  background-color: #258596;
  padding: 16px;
  border-radius: 12px;
  height: 112px;
  justify-content: center;
  margin-left: 40px;
  margin-right: 40px;
`;
export const TestimonialInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 4px;
`;
export const TestimonialName = styled.Text`
  color: ${Colors.white};
  font-size: 14px;
  font-weight: bold;
`;
export const TestimonialBody = styled.Text`
  color: ${Colors.white};
  font-size: 12px;
`;

export const BackButton = styled.TouchableOpacity`
  position: absolute;
  left: 16px;
  top: 32px;
  z-index: 9;
`;
