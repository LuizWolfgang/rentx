import React, { useState } from 'react';
import { Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';

import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs'; //no keyboard (qnd sobe o teclado pra digitar) retira o tab bar
import { useNavigation } from '@react-navigation/native';
import { useTheme } from 'styled-components';

import { Feather } from '@expo/vector-icons'
import { useAuth } from '../../hooks/auth';

import { BackButton } from '../../components/BackButton';
import { PasswordInput } from '../../components/PasswordInput';
import { Input } from '../../components/Input';

import {
 Container,
 Header,
 HeaderTop,
 HeaderTitle,
 LogoutButton,
 PhotoContainer,
 Photo,
 PhotoButton,
 Content,
 Options,
 OptionTitle,
 Option,
 Section
 } from './styles';


export function Profile(){
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation()

    function handleBack(){
        navigation.goBack();
    }

    function handleSignOut(){

    }

    function handleOptionChange( optionSelected: 'dataEdit' | 'passwordEdit'){
        setOption(optionSelected)
    }

return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
            <Header>
                <HeaderTop>
                    <BackButton
                        color={theme.colors.shape} 
                        onPress={handleBack}
                    />
                    <HeaderTitle>Editar Perfil</HeaderTitle>
                    <LogoutButton onPress={handleSignOut}>
                        <Feather 
                            name="power" 
                            size={24} 
                            color={theme.colors.shape}
                        />
                    </LogoutButton>
                </HeaderTop>

                <PhotoContainer>
                    <Photo source={{ uri: 'https://github.com/LuizWolfgang.png'}}/>
                    <PhotoButton onPress={() => {}}>
                        <Feather
                            name="camera"
                            size={24}
                            color={theme.colors.shape}
                        />
                    </PhotoButton>
                </PhotoContainer>
            </Header>
            <Content style={{ marginBottom: useBottomTabBarHeight()}}>
                <Options>
                    <Option
                        active={option === 'dataEdit'}
                        onPress={() => handleOptionChange('dataEdit')}
                    >
                        <OptionTitle active={option === 'dataEdit'}>Dados</OptionTitle>
                    </Option>
                    <Option 
                        active={option === 'passwordEdit'}
                        onPress={() => handleOptionChange('passwordEdit')}
                        >
                        <OptionTitle active={option === 'passwordEdit'}>Trocar senha</OptionTitle>
                    </Option>
                </Options>
                {   
                   option === 'dataEdit' ?  
                    <Section>
                        <Input
                            iconName="user"
                            placeholder="Nome"
                            autoCorrect={false}
                            defaultValue={user.name}
                        />
                        <Input
                            iconName="mail"
                            editable={false}
                            defaultValue={user.email}
                        />
                        <Input
                            iconName="credit-card"
                            placeholder="CNH"
                            keyboardType="numeric"
                            defaultValue={user.driver_license}
                        />
                    </Section>
                                         :
                    <Section>
                    <PasswordInput
                        iconName="lock"
                        placeholder="Senha Atual"
                    />
                    <PasswordInput
                        iconName="lock"
                        placeholder="Nova Atual"
                    />
                    <PasswordInput
                        iconName="lock"
                        placeholder="Repetir Senha"
                    />
                </Section>
                }
                
           </Content>
        </Container>
     </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
   
    );
}