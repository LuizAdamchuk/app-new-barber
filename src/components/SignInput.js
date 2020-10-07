import React from 'react';
import styled from 'styled-components/native';
import { Feather } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const InputArea = styled.View`
  width: 100%;
  height: 60px;
  background-color: ${Colors.primaryLightI};
  flex-direction: row;
  border-radius: 30px;
  padding-left: 15px;
  align-items: center;
  margin-bottom: 15px;
`;

const Input = styled.TextInput`
  flex: 1;
  font-size: 16px;
  color: ${Colors.primaryDarkII};
  margin-left: 8px;
`;

export default ({
  iconName,
  iconColor,
  placeholder,
  value,
  onChangeText,
  password,
}) => {
  return (
    <InputArea>
      {iconName && <Feather name={iconName} size={24} color={iconColor} />}
      <Input
        placeholder={placeholder}
        placeholderTextColor={Colors.primaryDarkII}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={password}
      />
    </InputArea>
  );
};
