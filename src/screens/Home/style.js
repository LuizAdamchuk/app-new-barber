import styled from 'styled-components/native';

import Colors from '../../constants/Colors';

export const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${Colors.primary};
`;

export const Scroller = styled.ScrollView`
  flex: 1;
  padding: 20px;
`;
export const HeaderArea = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const HeaderTitle = styled.Text`
  width: 250px;

  font-size: 24px;
  font-weight: bold;
  color: ${Colors.white};
`;
export const SearchButton = styled.TouchableOpacity`
  width: 32px;
  height: 32px;
`;
export const LocationArea = styled.View`
  background-color: ${Colors.primaryDarkI};
  height: 60px;
  border-radius: 30px;
  flex-direction: row;
  align-items: center;
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 30px;
`;
export const LocationInput = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${Colors.white};
`;
export const LocationFinder = styled.TouchableOpacity`
  height: 32px;
  width: 32px;
`;
export const ListArea = styled.View`
  margin-top: 30px;
  margin-bottom: 30px;
`;
