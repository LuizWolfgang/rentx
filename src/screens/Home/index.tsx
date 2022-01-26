import React, {useEffect, useState} from 'react';
import { StatusBar } from 'react-native';
import Logo from '../../assets/logo.svg'

import { api } from '../../services/api'
import {CarDTO} from '../../dtos/CarDTO'

import {Load} from '../../components/Load';

import {Ionicons} from '@expo/vector-icons'

import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation } from '@react-navigation/native';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
 MyCarsButton
 } from './styles';

import { Car } from '../../components/Car'

import { useTheme } from 'styled-components/native';


export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([])
    const [loading, setLoading] = useState(true)

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
         {
             loading ? <Load/> :
        <CarList
            data={cars}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <Car data={item} onPress={() => handleCarDetails(item)}/>}
        />
    }
    <MyCarsButton onPress={handleOpenMyCars}>
        <Ionicons
         name="ios-car-sport"
         size={32}
         color={theme.colors.shape}
         />
    </MyCarsButton>
     </Container>
    );
}