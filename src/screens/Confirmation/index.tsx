import React from 'react';
import { StatusBar, useWindowDimensions } from 'react-native';

import {
 Container,
 Content,
 Title,
 Message,
 Footer
 } from './styles';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';
import { ConfirmButton } from '../../components/ConfirmButton';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Params{
    title: string;
    message: string;
    nextScreenRoutes: string
}

export function Confirmation() {
    const { width } = useWindowDimensions();
    const navigation = useNavigation();
    const route = useRoute();
    const { title, message, nextScreenRoutes } = route.params as Params

function handleConfirm(){
    navigation.navigate(nextScreenRoutes);
}

return (
     <Container>
         <StatusBar
            barStyle="light-content"
            translucent
            backgroundColor="transparent"
         />
         <LogoSvg width={width}/>

         <Content>
             <DoneSvg width={80} height={80}/>
             <Title>{title}</Title>

             <Message>{message}</Message>
         </Content>
         <Footer>
             <ConfirmButton title="OK" onPress={handleConfirm}/>
         </Footer>
     </Container>
    );
}