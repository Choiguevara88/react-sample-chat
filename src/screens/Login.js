import React, { useRef, useState } from 'react';
import { Image, Input } from '../components';
import styled from 'styled-components/native';
import { images } from '../utils/images';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {validateEmail, removeWhitespace} from '../utils/common';

const Container = styled.View`
    flex : 1;
    justify-content : center;
    align-items: center;
    background-color : ${ ({theme})=>theme.background };
    padding:20px;
`;
const ErrorText = styled.Text`
    align-items:flex-start;
    width:100%;
    height:20px;
    margin-bottom:10px;
    line-height:20px;
    color:${ ({theme})=>theme.errorText };
`;

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const passwordRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');

    const _handleEmailChange = email => {
        const changedEmail = removeWhitespace(email);
        setEmail(changedEmail);
        setErrorMessage(validateEmail(changedEmail) ? '' : 'Please verify email.');
    }
    const _handlePasswordChange = password => {
        setPassword(removeWhitespace(password));
    }

    return (
        <KeyboardAwareScrollView 
            contentContainerStyle={{flex:1}}
            extraScrollHeight={20}
        >
            <Container>
                <Image url={images.logo} imageStyle={{borderRadius:50}}/>
                <Input
                    label="Email"
                    value={email}
                    onChangeText={ _handleEmailChange }
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={ _handlePasswordChange }
                    onSubmitEditing={()=>{}}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{ errorMessage }</ErrorText>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Login;