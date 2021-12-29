import React from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg'
import { RFValue } from 'react-native-responsive-fontsize';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList
 } from './styles';

 import { Car } from '../../components/Car'

export function Home(){

    const carData = {
    brand: 'AUDI',
    name: 'R$ 5 Coupé',
    rent:{
        period:'AO DIA',
        price:120,
    },
    thumbnail:'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png',
 }
    
return (
     <Container>
        <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
        /> 
         <Header> 
             <HeaderContent>
                <Logo
                    width={RFValue(108)}
                    height={RFValue(12)}
                />
                <TotalCars>
                    Total de 12 carros
                </TotalCars>    
             </HeaderContent>   
         </Header>
        <CarList
            data={[1,2,3]}
            keyExtractor={item => String(item)}
            renderItem={({ item }) => <Car data={carData}/>}
        />
     </Container>
    );
}