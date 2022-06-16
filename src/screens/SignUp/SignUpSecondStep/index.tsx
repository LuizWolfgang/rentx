import { useNavigation, useRoute } from '@react-navigation/native';
import { 
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { api } from '../../../services/api';

import { useTheme } from 'styled-components';
import React, { useState } from 'react';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { Button } from '../../../components/Button';
import { Input } from '../../../components/Input';
import { PasswordInput } from '../../../components/PasswordInput';
import { Confirmation } from '../../Confirmation'

import {
 Container,
 Header,
 Steps,
 Title,
 Subtitle,
 Form,
 FormTitle,
 } from './styles';


interface Params {
    user: {
        name: string,
        email: string,
        driverLicense: string,
    }
}

export function SignUpSecondStep(){
const [password, setPassword] = useState('')
const [passwordConfirm, setPasswordConfirma] = useState('')

const theme = useTheme();
const navigation = useNavigation()
const route = useRoute();

const { user } = route.params as Params;

function handleBack(){
    navigation.goBack();
 }

async function handleRegister(){
    if(!password || !passwordConfirm){
        return Alert.alert('Informe a senha e a confirmação.')
    }

    if(password != passwordConfirm){
        return Alert.alert('As senhas não são iguais')
    }

    //enviar pra api
    await api.post('/users', {
        name: user.name,
        email: user.email,
        driver_license: user.driverLicense,
        password
    })
    .then(()=> {
        navigation.navigate('Confirmation', {
        nextScreenRoutes: 'SignIn',
        title: 'Conta Criada!',
        message: `Agora é só fazer login\ne aproveitar`
    });
    })
    .catch((e) => {
        Alert.alert('Opa', 'Não foi possivel cadastrar')
    })
}

return (
    <KeyboardAvoidingView behavior="position" enabled>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Container>
                <Header>
                <BackButton onPress={handleBack}/>
                    <Steps>
                        <Bullet/>
                        <Bullet/>
                    </Steps>
                </Header>
                <Title>
                    Crie sua{'\n'}conta
                </Title>
                <Subtitle>
                    Faça seu cadastro de{'\n'}
                    forma rápida e fácil
                </Subtitle>

                <Form>
                    <FormTitle>1. Senha</FormTitle>
                    <PasswordInput
                        iconName="lock"
                        placeholder="Senha"
                        onChangeText={setPassword}
                        value={password}
                    />

                     <PasswordInput
                        iconName="lock"
                        placeholder="Repetir senha"
                        onChangeText={setPasswordConfirma}
                        value={passwordConfirm}
                    />
                </Form>  

                <Button
                    color={theme.colors.success}
                    title="Próximo"
                    onPress={handleRegister}
                />
            </Container>
     </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
     
    );
}