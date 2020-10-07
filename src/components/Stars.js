import React from 'react';
import styled from 'styled-components/native';

import { FontAwesome } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const ContainerStars = styled.View`
  flex-direction: row;
`;
const StarView = styled.View`
  margin-left: 2px;
`;
const StarText = styled.Text`
  font-size: 12px;
  font-weight: bold;
  margin-left: 4px;
  color: ${Colors.gray};
`;
export const Stars = ({ stars, showNumber }) => {
  let s = [0, 0, 0, 0, 0];
  let floor = Math.floor(stars);
  let left = stars - floor;

  for (var i = 0; i < floor; i++) {
    s[i] = 2;
  }
  if (left > 0) {
    s[i] = 1;
  }
  return (
    <ContainerStars>
      {s.map((i, k) => (
        <StarView key={k}>
          {i === 0 && (
            <FontAwesome name="star-o" size={16} color={Colors.orange} />
          )}
          {i === 1 && (
            <FontAwesome
              name="star-half-empty"
              size={16}
              color={Colors.orange}
            />
          )}
          {i === 2 && (
            <FontAwesome name="star" size={16} color={Colors.orange} />
          )}
        </StarView>
      ))}
      {showNumber && <StarText>{stars}</StarText>}
    </ContainerStars>
  );
};
