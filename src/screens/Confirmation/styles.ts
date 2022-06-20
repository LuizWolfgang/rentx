import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex:1;
  background-color: ${({ theme }) => theme.colors.header};
`;

export const Content = styled.View`

  justify-content: center;
  align-items: center;
  padding-bottom:10px;

`

export const Title = styled.Text`
  font-size: ${RFValue(30)}px;
  color: ${({ theme }) => theme.colors.shape};
  font-family: ${({ theme }) => theme.fonts.secondary_600};

  margin-top:20px;

`
export const Message = styled.Text`
  font-size: ${RFValue(15)}px;
  color: ${({ theme }) => theme.colors.text_detail};
  font-family: ${({ theme }) => theme.fonts.primary_400};

  line-height: ${RFValue(25)}px;
  text-align: center;
  margin-top:16px;
`

export const Footer = styled.View`
  width: 100%;
  align-items: center;
  justify-content:center;
  padding-bottom: ${getStatusBarHeight() + 10}px;
  margin-bottom: ${getStatusBarHeight() + 10}px;

`