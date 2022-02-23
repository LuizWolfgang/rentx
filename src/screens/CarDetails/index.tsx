import React from 'react';
import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Accessory } from '../../components/Acessory';
import { getAccessoryIcon } from '../../utils/getAccessoryicon'

import {
 Container,
 Header,
 CarImages,
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


import Animated, { 
    useSharedValue, 
    useAnimatedScrollHandler, 
    useAnimatedStyle, 
    interpolate, 
    Extrapolate } from 'react-native-reanimated';

import { CarDTO } from '../../dtos/CarDTO';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StyleSheet, StatusBar } from 'react-native';

interface Params {
    car: CarDTO
}

export function CarDetails(){

    const theme = useTheme()

    const route = useRoute()

    const {car} = route.params as Params;
    
    const navigation = useNavigation()

    const scrollY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler(event => {
      scrollY.value = event.contentOffset.y;  
   
    });

    
const sliderCarsStyleAnimation = useAnimatedStyle(() => {
        return {
          opacity: interpolate(
            scrollY.value,
            [0, 150],
            [1, 0],
            Extrapolate.CLAMP
          )
        }
      });
   
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [200, 70],
        Extrapolate.CLAMP
      ),
    }
  });

    function handleConfirmRental(){
       navigation.navigate('Scheduling', {car});
    }

    function goBack(){
        navigation.goBack()
     }

return (
     <Container>
          <StatusBar 
            barStyle="dark-content"
            translucent
            backgroundColor="transparent"      
            
        />

        
         <Animated.View
        style={[
            headerStyleAnimation, 
            styles.header,
          { backgroundColor: theme.colors.background_secondary}
        ]}
      >
          
          <Header>
                <BackButton onPress={goBack}/>
            </Header>
         
        <Animated.View style={sliderCarsStyleAnimation}> 
            <CarImages>
                <ImageSlider imagesUrl={car.photos}/>
            </CarImages>
               </Animated.View>  
        </Animated.View>
     

        <Animated.ScrollView
            contentContainerStyle={{
                paddingHorizontal: 24,
                paddingTop: getStatusBarHeight() + 160,
            }}
            showsVerticalScrollIndicator={false}
            onScroll={scrollHandler}
            scrollEventThrottle={16}
        >
       
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
            <Animated.ScrollView/>

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
            <About>{car.about}</About>
         

            <Footer>
                <Button title="Escolher periodo do aluguel" color={theme.colors.success} onPress={handleConfirmRental}/>
            </Footer>

        </Animated.ScrollView>
     </Container>
    )
}

const styles = StyleSheet.create({
    header: {
      position: 'absolute',
      overflow: 'hidden', 
      zIndex: 1,
    },
  })