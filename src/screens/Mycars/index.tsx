import { useNavigation } from '@react-navigation/native';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { FlatList, StatusBar } from 'react-native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dtos/CarDTO';
import { api } from '../../services/api';
import { AntDesign } from '@expo/vector-icons'
import { Load } from '../../components/Load'

import {
    Container,
    Header,
    Title,
    SubTitle,
    Content,
    Appointments,
    AppointmentsTitle,
    AppointmentsQuantity,
    CarWrapper,
    CarFooter,
    CarFooterTitle,
    CarFooterDate
} from './styles';

interface CarProps {
    id: string;
    user_id: string;
    car: CarDTO;
    startDate: string;
    endDate: string;
  }
  

export function MyCars(){
    const [cars , setCars] = useState<CarProps[]>([])
    const [loading, setLoading] = useState(true)

    const navigation = useNavigation()

    const theme = useTheme();

    function goBack(){
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars() {
            try {
                const response = await api.get('/schedules_byuser?user_id=1')
                setCars(response.data)
                console.log(response.data)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    },[])

    const totalCars = cars.length

    console.log(totalCars)
    
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

             <SubTitle>
                Conforto, segurança e praticidade
             </SubTitle>
         </Header>
        { loading ? <Load/> :
        <Content>
             <Appointments>
                <AppointmentsTitle>Agendamentos feitos</AppointmentsTitle>
                <AppointmentsQuantity>{totalCars}</AppointmentsQuantity>
            </Appointments>

            <FlatList 
                data={cars}
                keyExtractor={item => String(item.id)}
                showsVerticalScrollIndicator={false}
                renderItem={({item}) => (
                    <CarWrapper>
                         <Car data={item.car}/>
                         <CarFooter>
                            <CarFooterTitle>Periodo</CarFooterTitle>
                            <CarFooterDate>{item.startDate}</CarFooterDate>
                                <AntDesign
                                    name="arrowright"
                                    size={20}
                                    color={theme.colors.title}
                                    style={{ marginHorizontal: 10}}
                                />
                            <CarFooterDate>{item.endDate}</CarFooterDate>
                         </CarFooter>
                    </CarWrapper>
                )}
                />
        </Content>
            }
     </Container>
    );
}