import React, {useEffect, useState} from 'react';
import { StatusBar, StyleSheet, BackHandler } from 'react-native';
import Logo from '../../assets/logo.svg'

import { api } from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'

import {LoadAnimation} from '../../components/LoadAnimation';

import {Ionicons} from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import Animated, {
    useAnimatedStyle,
    useSharedValue,
    useAnimatedGestureHandler,
    withSpring
} from 'react-native-reanimated'

const ButtonAnimated = Animated.createAnimatedComponent(RectButton)

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 } from './styles';

import { Car } from '../../components/Car'

import { useTheme } from 'styled-components/native';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';


export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] = useState(true)

    const positionY = useSharedValue(0);
    const positionX = useSharedValue(0);

    const myCarButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                {translateX: positionX.value},
                {translateY: positionY.value},
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx:any){
            ctx.positionX = positionX.value
            ctx.positionY = positionY.value
        },
        onActive(event, ctx:any){
            positionX.value = ctx.positionX + event.translationX;
            positionY.value = ctx.positionY + event.translationY;
        },
        onEnd(){
            positionX.value = withSpring(0)
            positionY.value = withSpring(0)
        }
    })

    const navigation = useNavigation()
    const theme = useTheme()

//     const carData = {
//     brand: 'AUDI',
//     name: 'R$ 5 Coupé',
//     rent:{
//         period:'AO DIA',
//         price:120,
//     },
//     thumbnail:'https://www.pngmart.com/files/1/Audi-RS5-Red-PNG.png',
//  }
    
 function handleCarDetails(car:CarDTO){
     //passando os parametros para a outra tela do carro selecionado
     //console.log('Car:', car)
    navigation.navigate('CarDetails', { car })
 }

 function handleOpenMyCars(){
    //passando os parametros para a outra tela do carro selecionado
    //console.log('Car:', car)
   navigation.navigate('MyCars')
}

 useEffect(() => {
    async function fetchCars(){
        try {
            const response = await api.get('/cars')
            setCars(response.data)
        } catch (error) {
            console.error('Requisicao da listagem dos carros', error)
        }finally{
            setLoading(false);
        }
    }
    fetchCars()
 },[])

 useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
        return true
    })
 },[])

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
                {
                    !loading &&
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>    
                }
              
             </HeaderContent>   
         </Header>
         {
             loading ? <LoadAnimation/> :
        <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
    }
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View
                style={[myCarButtonStyle,
                {
                    position: 'absolute',
                    bottom: 13,
                    right:22
                }
            ]}
            >
                <ButtonAnimated 
                    onPress={handleOpenMyCars}
                    style={[styles.button, {backgroundColor: theme.colors.main}]}
                >
                    <Ionicons
                    name="ios-car-sport"
                    size={32}
                    color={theme.colors.shape}
                    />
                </ButtonAnimated>
            </Animated.View>
        </PanGestureHandler>
     </Container>
    );
}

const styles = StyleSheet.create({
    button:{
        width: 60,
        height:60,
        borderRadius:30,
        justifyContent:'center',
        alignItems:'center'
    }
})