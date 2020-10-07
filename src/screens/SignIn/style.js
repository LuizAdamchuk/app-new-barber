import styled from 'styled-components/native';

import Colors from '../../constants/Colors';

export const Container = styled.SafeAreaView`
  background-color: ${Colors.primary};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const InputArea = styled.View`
  padding: 40px;
  width: 100%;
  flex: 1;
`;

export const CustomButtom = styled.TouchableOpacity`
  height: 60px;
  background-color: ${Colors.primaryDarkII};
  border-radius: 30px;
  justify-content: center;
  align-items: center;
`;
export const CustomButtonText = styled.Text`
  font-size: 18px;
  color: ${Colors.white};
`;

export const SignMessageButton = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  margin-top: 50px;
  margin-bottom: 20px;
`;
export const SignMessageButtonText = styled.Text`
  font-size: 16px;
  color: ${Colors.primaryDarkII};
`;
export const SignMessageButtonTextBold = styled.Text`
  font-size: 16px;
  color: ${Colors.primaryDarkII};
  font-weight: bold;
  margin-left: 5px;
`;
