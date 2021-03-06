import React, { useEffect, useState } from 'react';
import theme from '../../styles/theme';
import { useNavigation } from '@react-navigation/native';

import { 
    StatusBar,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
    Alert,
    Platform
} from 'react-native';

import * as Yup from 'yup'
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { PasswordInput } from '../../components/PasswordInput';

import { database } from '../../database'

import {
 Container,
 Header,
 Title,
 SubTitle,
 Form,
 Footer
 } from './styles';
import { useAuth } from '../../hooks/auth';


export function SignIn(){

const[ email, setEmail] = useState('')
const[ password, setPassword ] = useState('')

const navigation = useNavigation()
const { signIn } = useAuth();

async function handleSignIn(){
    try {
      const schema = Yup.object().shape({
        email: Yup.string()
        .required('E-mail obrigatório')
        .email('Digite um e-mail válido'),
        password: Yup.string()
        .required('A senha é obrigatória')
    });
    await schema.validate({ email, password})    
    signIn({ email, password });
    } catch (error) {
        if(error instanceof Yup.ValidationError){
           Alert.alert('Opa', error.message)
        }else{
           Alert.alert(
            'Erro na autenticação',
            'Ocorreu um erro ao fazer login, verifique as credenciais'
           )
        }
    }
}

function handleNewAccount(){
    navigation.navigate('SignUpFirstStep')
}

return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
       <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
         <Container>
            <StatusBar
                barStyle="dark-content"
                backgroundColor="transparent"
                translucent
            />
            <Header>
                <Title>
                    Estamos{'\n'}quase lá.
                </Title>
                <SubTitle>
                    Faça seu login para começar{'\n'}
                    uma experiência incrível. 
                </SubTitle>
            </Header>

            <Form>
                <Input
                    iconName="mail"
                    placeholder="E-mail"
                    keyboardType="email-address"
                    autoCorrect={false}//nao ficar corrigindo
                    autoCapitalize="none" //retira a primeira letra maiuscula
                    onChangeText={setEmail}
                    value={email}
                />

                <PasswordInput
                    iconName="lock"
                    placeholder="Senha"
                    onChangeText={setPassword}
                    value={password}
                />
        
            </Form>
            
            <Footer>
                <Button
                    onPress={handleSignIn}
                    title="Login"
                    enabled
                    loading={false}
                />
                <Button
                    onPress={handleNewAccount}
                    light
                    color={theme.colors.background_secondary}
                    title="Criar conta gratuita"
                    loading={false}
                />
            </Footer>
        </Container>
        </TouchableWithoutFeedback> 
     </KeyboardAvoidingView>
    );
}