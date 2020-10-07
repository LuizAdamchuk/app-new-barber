import React, { useEffect } from 'react';
import styled from 'styled-components/native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Alert } from 'react-native';
import Api from '../Api';
import Colors from '../constants/Colors';

const ContainerModal = styled.Modal``;
const ModalArea = styled.View`
  flex: 1;
  background-color: rgba(0, 0, 0, 0.5);
  justify-content: flex-end;
`;
const ModalBody = styled.View`
  background-color: ${Colors.primaryLightI};
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  min-height: 300px;
  padding: 12px 24px 40px 24px;
`;
const CloseButton = styled.TouchableOpacity`
  height: 56px;
  width: 56px;
  margin-top: -32px;
`;

const ModalItem = styled.View`
  background-color: ${Colors.white};
  border-radius: 12px;
  margin-top: 16px;
  padding: 12px;
`;
const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;
const UserAvatar = styled.Image`
  width: 56px;
  height: 56px;
  border-radius: 16px;
  margin-right: 16px;
`;
const UserName = styled.Text`
  color: ${Colors.black};
  font-size: 18px;
  font-weight: bold;
`;
const ServiceInfo = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;
const ServiceName = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const ServicePrice = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;
const DateInfo = styled.View`
  flex-direction: row;
`;
const DatePrevArea = styled.TouchableOpacity`
  flex: 1;
  justify-content: flex-end;
  align-items: flex-end;
`;
const DateTitleArea = styled.View`
  width: 140px;
  align-items: center;
  justify-content: center;
`;
const DateTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;
const DateNextArea = styled.TouchableOpacity`
  flex: 1;
  align-items: flex-start;
`;
const DateList = styled.ScrollView``;
const DateItem = styled.TouchableOpacity`
  width: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding-top: 4px;
  padding-bottom: 4px;
`;
const DateItemWeekDay = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;
const DateItemNumber = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;
const TimeList = styled.ScrollView``;
const TimeItem = styled.TouchableOpacity`
  width: 72px;
  height: 40px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
`;
const TimeItemText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  color: ${Colors.black};
`;

const FinishButton = styled.TouchableOpacity`
  background-color: ${Colors.primaryDarkII};
  height: 56px;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  margin-top: 12px;
`;

const FinishButtonText = styled.Text`
  color: ${Colors.white};
  font-size: 16px;
  font-weight: bold;
`;

const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

const days = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const BarberModal = ({ show, setShowModal, user, service }) => {
  const navigation = useNavigation();

  const [selectedYear, setSelectedYear] = useState(0);
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [selectedDay, setSelectedDay] = useState(0);
  const [selectedHour, setSelectedHour] = useState(null);
  const [listDays, setListDays] = useState([]);
  const [listHours, setListHours] = useState([]);

  useEffect(() => {
    let today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedDay(today.getDate());
  }, []);

  useEffect(() => {
    if (user.available) {
      // Quantos dias o mês tem
      let daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();
      let newListDays = [];

      for (let i = 1; i <= daysInMonth; i++) {
        let d = new Date(selectedYear, selectedMonth, i);

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter(e => e.date === selDate);

        newListDays.push({
          status: availability.length > 0 ? true : false,
          weekDay: days[d.getDay()],
          number: i,
        });
      }
      setListDays(newListDays);
      setSelectedDay(0);
      setListHours([]);
      setSelectedDay(0);
    }
  }, [user, selectedMonth, selectedYear]);

  useEffect(() => {
    if (user.available) {
      if (selectedDay > 0) {
        let d = new Date(selectedYear, selectedMonth, selectedDay);

        let year = d.getFullYear();
        let month = d.getMonth() + 1;
        let day = d.getDate();

        month = month < 10 ? '0' + month : month;
        day = day < 10 ? '0' + day : day;

        let selDate = `${year}-${month}-${day}`;

        let availability = user.available.filter(e => e.date === selDate);

        if (availability.length > 0) {
          setListHours(availability[0].hours);
        }
      }
    }
    setSelectedHour(null);
  }, [user, selectedDay]);

  const handleCloseButton = () => {
    setShowModal(false);
  };
  const handleDatePrevClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() - 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(1);
  };
  const handleDateNextClick = () => {
    let mountDate = new Date(selectedYear, selectedMonth, 1);
    mountDate.setMonth(mountDate.getMonth() + 1);
    setSelectedYear(mountDate.getFullYear());
    setSelectedMonth(mountDate.getMonth());
    setSelectedDay(0);
  };
  const handleAppointment = async () => {
    if (
      user.id &&
      service !== null &&
      selectedYear > 0 &&
      selectedMonth > 0 &&
      selectedDay > 0 &&
      selectedHour !== null
    ) {
      // let res = Api.setAppointments(
      //   user.id,
      //   service,
      //   selectedYear,
      //   selectedMonth,
      //   selectedDay,
      //   selectedHour,
      // );
      // if (res.error === '') {
      //   setShowModal(false);
      //   navigation.navigate('Appointments');
      // } else {
      //   Alert.alert(
      //     'Atenção',
      //     'Erro ao cadastrar, tente novamente mais tarde.',
      //   );
      // }
      setShowModal(false);
      navigation.navigate('Appointments');
    } else {
      Alert.alert('Atenção', 'Preencha todos os dados');
    }
  };
  return (
    <ContainerModal transparent visible={show} animationType="slide">
      <ModalArea>
        <ModalBody>
          <CloseButton onPress={handleCloseButton}>
            <Ionicons
              name="ios-arrow-dropdown-circle"
              size={56}
              color={Colors.white}
            />
          </CloseButton>
          <ModalItem>
            <UserInfo>
              <UserAvatar source={{ uri: user.avatar }} />
              <UserName>{user.name}</UserName>
            </UserInfo>
          </ModalItem>
          {service !== null && (
            <ModalItem>
              <ServiceInfo>
                <ServiceName>{user.services[service].name}</ServiceName>
                <ServicePrice>
                  R${user.services[service].price.toFixed(2)}
                </ServicePrice>
              </ServiceInfo>
            </ModalItem>
          )}
          <ModalItem>
            <DateInfo>
              <DatePrevArea onPress={handleDatePrevClick}>
                <Ionicons
                  name="ios-arrow-back"
                  size={32}
                  color={Colors.black}
                />
              </DatePrevArea>
              <DateTitleArea>
                <DateTitle>
                  {months[selectedMonth]} {selectedYear}
                </DateTitle>
              </DateTitleArea>
              <DateNextArea onPress={handleDateNextClick}>
                <Ionicons
                  name="ios-arrow-forward"
                  size={32}
                  color={Colors.black}
                />
              </DateNextArea>
            </DateInfo>
            <DateList horizontal showsHorizontalScrollIndicator={false}>
              {listDays.map((i, k) => (
                <DateItem
                  key={k}
                  onPress={() => {
                    i.status ? setSelectedDay(i.number) : null;
                  }}
                  style={{
                    opacity: i.status === true ? 1 : 0.5,
                    backgroundColor:
                      i.number === selectedDay
                        ? Colors.primaryDarkI
                        : Colors.white,
                  }}
                >
                  <DateItemWeekDay
                    style={{
                      color:
                        i.number === selectedDay ? Colors.white : Colors.black,
                    }}
                  >
                    {i.weekDay}
                  </DateItemWeekDay>
                  <DateItemNumber
                    style={{
                      color:
                        i.number === selectedDay ? Colors.white : Colors.black,
                    }}
                  >
                    {i.number}
                  </DateItemNumber>
                </DateItem>
              ))}
            </DateList>
          </ModalItem>
          {selectedDay > 0 && listHours.length > 0 && (
            <ModalItem>
              <TimeList horizontal showsHorizontalScrollIndicator={false}>
                {listHours.map((i, k) => (
                  <TimeItem
                    key={k}
                    onPress={() => setSelectedHour(i)}
                    style={{
                      backgroundColor:
                        i === selectedHour ? Colors.primaryDarkI : Colors.white,
                    }}
                  >
                    <TimeItemText
                      style={{
                        color: i === selectedHour ? Colors.white : Colors.black,
                      }}
                    >
                      {i}
                    </TimeItemText>
                  </TimeItem>
                ))}
              </TimeList>
            </ModalItem>
          )}

          <FinishButton onPress={handleAppointment}>
            <FinishButtonText>Finalizar agendamento</FinishButtonText>
          </FinishButton>
        </ModalBody>
      </ModalArea>
    </ContainerModal>
  );
};
