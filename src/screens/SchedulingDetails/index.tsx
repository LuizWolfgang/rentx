import React, { useEffect, useState } from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';

import { Accessory } from '../../components/Acessory';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';

import { useTheme } from 'styled-components';
import { getAccessoryIcon } from '../../utils/getAccessoryicon'
import { useNavigation, useRoute } from '@react-navigation/native';

import { CarDTO } from '../../dtos/CarDTO';
import { Button } from '../../components/Button';
import { format } from 'date-fns';
import { getPlatformDate } from '../../utils/getPlatformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

import {
 Container,
 Header,
 CarImages,
 Content,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 Accessories,
 Footer,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
 } from './styles';


interface Params {
    car: CarDTO;
    dates: string[];
}

interface RentalPeriod {
    start: string;
    end: string;
}

export function SchedulingDetails(){
    
const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);
const [loading, setLoading] = useState(false)
const theme = useTheme();
const navigation = useNavigation()

const route = useRoute()
const {car, dates} = route.params as Params;

//total price
const rentTotal = Number(dates.length * car.rent.price);

async function handleConfirmRental(){

    setLoading(true)
    
    const schedulysByCar = await api.get(`/schedules_bycars/${car.id}`) //agendamentos pelo id do carro

    //pegando as datas que ja estavam agendadas na api + os dates da tela anterior
    const unavailable_dates = [
        ...schedulysByCar.data.unavailable_dates,
        ...dates
    ];

    await api.post('schedules_byuser', {
        user_id:1,
        car,
        startDate: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        endDate: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'),

    })

    api.put(`/schedules_bycars/${car.id}`, { //editando o car pelo id do carro = car.id
        id: car.id,
        unavailable_dates
    })
    .then(() => {
        navigation.navigate('SchedulingComplete');
    })
    .catch(() => {
        setLoading(false)
        Alert.alert('Não foi possivel confirmar o agendamento')
    })
}

function goBack(){
    navigation.goBack()
}

useEffect(() => { //Toda vez que mostrar a tela
    setRentalPeriod({ 
        start: format(getPlatformDate(new Date(dates[0])), 'dd/MM/yyyy'),
        end: format(getPlatformDate(new Date(dates[dates.length -1])), 'dd/MM/yyyy'), // dates.length -1 pegando a ultima posicao do array
    })
}, [])

 
return (
     <Container>
         <Header>
             <BackButton onPress={goBack}/>
         </Header>
        <CarImages>
            <ImageSlider imagesUrl={car.photos}/>
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>{car.brand}</Brand>
                    <Name>{car.name}</Name>
                </Description>
            <Rent>
                <Period>{car.rent.period}</Period>
                <Price>{car.rent.price}</Price>
            </Rent>    
            </Details>

            <Accessories>
                {
                    car.accessories.map(accessories => {
                        <Accessory
                         key={accessories.type}
                         name={accessories.name}
                         icon={getAccessoryIcon(accessories.type)} />
                    })
                }
            </Accessories>

            <RentalPeriod>
                <CalendarIcon>
                    <Feather
                        name="calendar"
                        size={RFValue(24)}
                        color={theme.colors.shape}
                    />
                </CalendarIcon>

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>{rentalPeriod.start}</DateValue>
                </DateInfo>

                <Feather
                    name="chevron-right"
                    size={RFValue(10)}
                    color={theme.colors.text}
                />

                <DateInfo>
                    <DateTitle>ATÉ</DateTitle>
                    <DateValue>{rentalPeriod.end}</DateValue>
                </DateInfo>

            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>{`R$ ${car.rent.price} x${dates.length} diárias`}</RentalPriceQuota>
                    <RentalPriceTotal>R$ {rentTotal}</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
        </Content>

        <Footer>
                <Button title="Alugar agora"
                 color={theme.colors.success} 
                 enabled={!loading}
                 loading={loading}
                 onPress={handleConfirmRental}
                 />
        </Footer>
     </Container>
    )
}