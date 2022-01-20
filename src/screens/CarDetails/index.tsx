import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Acessory';
import { getAccessoryIcon } from '../../utils/getAccessoryicon'

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
 About,
 Accessories,
 Footer
 } from './styles';
import { Button } from '../../components/Button';
import { useNavigation, useRoute} from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dtos/CarDTO';

interface Params {
    car: CarDTO
}

export function CarDetails(){

    const theme = useTheme()

    const route = useRoute()

    const {car} = route.params as Params;
    
    const navigation = useNavigation()

    function handleConfirmRental(){
       navigation.navigate('Scheduling', {car});
    }

    function goBack(){
        navigation.goBack()
     }

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
                <Price>R$ {car.rent.price}</Price>
            </Rent>    
            </Details>

            <Accessories>
                {
                    car.accessories.map(accessories => (
                        <Accessory
                            key={accessories.type} 
                            name={accessories.name}
                            icon={getAccessoryIcon(accessories.type)} 
                        />
                    ))
                }
             
            </Accessories>

            <About>{car.about}</About>

            <Footer>
                <Button title="Escolher periodo do aluguel" color={theme.colors.success} onPress={handleConfirmRental}/>
            </Footer>

        </Content>
     </Container>
    )
}