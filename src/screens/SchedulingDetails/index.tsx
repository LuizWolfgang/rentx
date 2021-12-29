import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Acessory';
import {Feather} from '@expo/vector-icons'
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';


import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import energySvg from '../../assets/energy.svg';
import hybridSvg from '../../assets/hybrid.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';
import carSvg from '../../assets/car.svg';


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
 Acessories,
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
import { Button } from '../../components/Button';

export function SchedulingDetails(){

const theme = useTheme();
    
return (
     <Container>
         <Header>
             <BackButton onPress={() => console.log('oi')}/>
         </Header>
        <CarImages>
            <ImageSlider imagesUrl={['https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png']}/>
        </CarImages>

        <Content>
            <Details>
                <Description>
                    <Brand>Lamboguini</Brand>
                    <Name>Huracan</Name>
                </Description>
            <Rent>
                <Period>Ao dia</Period>
                <Price>R$ 580</Price>
            </Rent>    
            </Details>

            <Acessories>
               <Accessory name="380Km/h" icon={speedSvg} />
               <Accessory name="3.2.s" icon={accelerationSvg} />
               <Accessory name="800 HP" icon={forceSvg} />
               <Accessory name="Gasolina" icon={gasolineSvg} />
               <Accessory name="Auto" icon={energySvg} />
               <Accessory name="2 pessoas" icon={peopleSvg} />
            </Acessories>

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
                    <DateValue>18/06/2021</DateValue>
                </DateInfo>

                <Feather
                    name="chevron-right"
                    size={RFValue(10)}
                    color={theme.colors.text}
                />

                <DateInfo>
                    <DateTitle>DE</DateTitle>
                    <DateValue>18/06/2021</DateValue>
                </DateInfo>

            </RentalPeriod>

            <RentalPrice>
                <RentalPriceLabel>TOTAL</RentalPriceLabel>
                <RentalPriceDetails>
                    <RentalPriceQuota>R$ 580 x3 diárias</RentalPriceQuota>
                    <RentalPriceTotal>R$ 2.900</RentalPriceTotal>
                </RentalPriceDetails>
            </RentalPrice>
        </Content>

        <Footer>
                <Button title="Confirmar" color="#18b120"/>
            </Footer>
     </Container>
    )
}