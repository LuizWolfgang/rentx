import React, {useState} from 'react';
import { TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons'
import { BorderlessButton } from 'react-native-gesture-handler';

import {
 Container,
 IconContainer,
 InputText,
 } from './styles';
import { useTheme } from 'styled-components';


interface InputProps extends TextInputProps {
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?:string;
}
export function PasswordInput({
    iconName,
    value,
    ...rest
}: InputProps){

const theme = useTheme()   

const [isPasswordVisible, setisPasswordVisible] = useState(true);
const [isFocused, setIsFocused]=  useState(false);
const [isFilled, setIsFilled]=  useState(false);

function handleInputFocus(){
    setIsFocused(true);
}

function handleInputBlur(){
    setIsFocused(false);
    setIsFilled(!!value);
}

function handlePasswordVisibilityChange(){
    setisPasswordVisible(oldstate => !oldstate); //prevstate => estado anterior
}


return (
     <Container>
        <IconContainer
            isFocused={isFocused}
        >
            <Feather
                name={iconName}
                size={24}
                color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
            />
        </IconContainer> 
       
         <InputText 
            onFocus={handleInputFocus}
            onBlur={handleInputBlur}
            secureTextEntry={isPasswordVisible}
            isFocused={isFocused}
            autoCorrect={false}
            {...rest}
         />

         <BorderlessButton onPress={handlePasswordVisibilityChange}>
              <IconContainer
                isFocused={isFocused}
              >

                <Feather
                        name={isPasswordVisible ? "eye" : "eye-off"}
                        size={24}
                        color={theme.colors.text_detail}
                    />
              </IconContainer>         
         </BorderlessButton>
     </Container>
    );
}