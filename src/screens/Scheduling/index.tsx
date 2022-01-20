import React from 'react';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';

import { Button } from '../../components/Button';
import { Calendar, 
        DayProps, 
        generateInterval,
        MarkedDateProps, 
        
    } from '../../components/Calendar';

import ArrowSvg from '../../assets/arrow.svg'
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { CarDTO } from '../../dtos/CarDTO';

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

import { Alert, StatusBar } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';


interface RentalPeriod {
    startFormatted: string;
    endFormatted: string
}

interface Params {
    car: CarDTO
}

export function Scheduling(){
const [lastSelectedDate , setlastSelectedDate ] = useState<DayProps>({} as DayProps);
const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

const theme = useTheme()
const navigation = useNavigation()

const route = useRoute()
const {car} = route.params as Params;

    function handleConfirmRental(){
        if(!rentalPeriod.startFormatted || !rentalPeriod.endFormatted){
            Alert.alert('Selecione o intervalo para alugar')
        }else{
            navigation.navigate('SchedulingDetails', {
                car,
                dates: Object.keys(markedDates)
            });
        }
    }

    function goBack(){
        navigation.goBack()
    }

    function handleChangeDate(date:DayProps){

        console.log('date',date)
        //evitar o problema de data invalida, menor data e a primeiro e a maior é a ultima
        let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
        let end = date;

        if(start.timestamp > end.timestamp){
            start = end;
            end = start;
        }

        setlastSelectedDate(end);
        const interval = generateInterval(start, end)

        setMarkedDates(interval)


        const firstDate = Object.keys(interval)[0];
        const endDate = Object.keys(interval)[Object.keys(interval).length - 1];

        setRentalPeriod({ 
            startFormatted: format(getPlatformDate(new Date(firstDate)), 'dd/MM/yyyy'),
            endFormatted: format(getPlatformDate(new Date(endDate)), 'dd/MM/yyyy'),
        })
}

return (
     <Container>
          <Header>
              <StatusBar
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
              />
             <BackButton onPress={goBack} color={theme.colors.shape}/>
             <Title>
                 Escolha uma {'\n'}
                 data de inicio e {'\n'}
                 fim do aluguel {'\n'}
             </Title>

             <RentalPeriod>
                 <DateInfo>
                     <DateTitle>DE</DateTitle>
                     <DateValue selected={!!rentalPeriod.startFormatted}>{rentalPeriod.startFormatted}</DateValue>
                 </DateInfo>
                <ArrowSvg/>

                <DateInfo>
                     <DateTitle>ATE</DateTitle>
                     <DateValue selected={!!rentalPeriod.endFormatted}>{rentalPeriod.endFormatted}</DateValue>
                 </DateInfo>
             </RentalPeriod>

         </Header>

         <Content>
            <Calendar
                markedDates={markedDates}
                onDayPress={handleChangeDate}
            />
         </Content>

         <Fotter>
            <Button title="Confirmar" onPress={handleConfirmRental}/>
         </Fotter>
     </Container>
    );
}