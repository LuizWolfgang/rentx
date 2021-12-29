import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import { Button } from '../../components/Button';
import { Calendar } from '../../components/Calendar';
import ArrowSvg from '../../assets/arrow.svg'

import {
 Container,
 Header,
 Title,
 RentalPeriod,
 DateInfo,
 DateTitle,
 DateValue,
 Content,
 Fotter
 } from './styles';
import { StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';


export function Scheduling(){
    const theme = useTheme()

    const navigation = useNavigation()

function handleConfirmRental(){
    navigation.navigate('SchedulingDetails');
}

return (
     <Container>
          <Header>
              <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
              />
             <BackButton onPress={() => console.log('oi')} color={theme.colors.shape}/>
             <Title>
                 Escolha uma {'\n'}
                 data de inicio e {'\n'}
                 fim do aluguel {'\n'}
             </Title>

             <RentalPeriod>
                 <DateInfo>
                     <DateTitle>DE</DateTitle>
                     <DateValue selected={true}>18/06/2021</DateValue>
                 </DateInfo>
                <ArrowSvg/>

                <DateInfo>
                     <DateTitle>ATE</DateTitle>
                     <DateValue selected={true}>18/06/2021</DateValue>
                 </DateInfo>

             </RentalPeriod>

         </Header>

         <Content>
            <Calendar/>
         </Content>

         <Fotter>
            <Button title="Confirmar" onPress={handleConfirmRental}/>
         </Fotter>
     </Container>
    );
}