import React, { useEffect, useState } from 'react';
import { useIsFocused, useNavigation } from '@react-navigation/native';

import { FlatList, StatusBar } from 'react-native';

import { useTheme } from 'styled-components';

import { BackButton } from '../../components/BackButton';
import { Car } from '../../components/Car';
import {LoadAnimation} from '../../components/LoadAnimation';

import { api } from '../../services/api';
import { Car as ModelCar } from '../../database/model/Car';
import { AntDesign } from '@expo/vector-icons'
import { parseISO, format } from 'date-fns';

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

interface DataProps {
    id: string;
    car: ModelCar; 
    start_date: string;
    end_date: string;  
}

export function MyCars(){
    const [cars , setCars] = useState<DataProps[]>([])
    const [loading, setLoading] = useState(true)
    const screenIsFocus = useIsFocused() //foco na tela (erro de quando cadastra um carro e nao aparace na hora na tela de agendamentos)

    const navigation = useNavigation()

    const theme = useTheme();

    function goBack(){
        navigation.goBack()
    }

    useEffect(() => {
        async function fetchCars(){
            try {
              const response = await api.get('/rentals');   
              const dataFormatted = response.data.map((data: DataProps) => {
                return {
                    id: data.id,
                    car: data.car,
                    start_date: format(parseISO(data.start_date), 'dd/MM/yyyy'),
                    end_date: format(parseISO(data.end_date), 'dd/MM/yyyy'),
                }
              })           
              setCars(dataFormatted);
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        fetchCars();
    },[screenIsFocus])

    const totalCars = cars.length
    
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
        { loading ? <LoadAnimation/> :
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
                            <CarFooterDate>{item.start_date}</CarFooterDate>
                                <AntDesign
                                    name="arrowright"
                                    size={20}
                                    color={theme.colors.title}
                                    style={{ marginHorizontal: 10}}
                                />
                            <CarFooterDate>{item.end_date}</CarFooterDate>
                         </CarFooter>
                    </CarWrapper>
                )}
                />
        </Content>
            }
     </Container>
    );
}