import React, { useContext, useEffect, useRef, useState } from 'react';
import styled from 'styled-components/native';
import { Image, Input, Button } from '../components';
import { removeWhitespace, validateEmail } from '../utils/common';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {images} from '../utils/images';
import { Alert } from 'react-native';
import { signup } from '../utils/firebase';
import { ProgressContext, UserContext } from '../contexts';
import { login } from '../utils/firebase';

const Container = styled.View`
    flex: 1;
    justify-content:center;
    align-items:center;
    background-color:${({theme})=>theme.background};
    padding: 40px 20px;
`;

const ErrorText = styled.Text`
    align-items:flex-start;
    width:100%;
    height:20px;
    margin-bottom:10px;
    line-height:20px;
    color: ${({theme})=> theme.errorText};
`;

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [disabled, setDisabled] = useState(true);
    const [photoUrl, setPhotoUrl] = useState(images.photo);

    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmRef = useRef();
    const didMountRef = useRef();

    const {spinner} = useContext(ProgressContext);
    const { dispatch }  = useContext(UserContext);

    useEffect(()=>{
        if(didMountRef.current) {
            let _errMsg = '';
            if(!name)                               _errMsg = 'Please enter your name';
            else if(!validateEmail(email))          _errMsg = 'Please verify your email.';
            else if(password.length < 6)            _errMsg = "The password must contain 6 characters at least";
            else if(password != passwordConfirm)    _errMsg = "Passwords need to match";
            else                                    _errMsg = '';
            setErrorMessage(_errMsg);
        } else {
            didMountRef.current = true;
        }
    }, [name, email, password, passwordConfirm]);

    useEffect(()=>{
        setDisabled(
            !(name && email && password && passwordConfirm && !errorMessage)
        )
    }, [name, email, password, passwordConfirm, errorMessage]);

    const _handleSignupButtonPress = async () => {
        try {
            spinner.start();
            const user = await signup({email, password, name, photoUrl});
            console.log(user);
            Alert.alert('Signup Success', user.email);
            const signOk = await login({ email, password });
            dispatch(signOk);
        } catch(e) {
            Alert.alert('Signup Error', e.message);
        } finally {
            spinner.stop();
        }
    };

    return (
        <KeyboardAwareScrollView
            extraScrollHeight={20}
        >
            <Container>
                <Image rounded url={photoUrl} showButton onChangeImage={url=> setPhotoUrl(url)}/>
                <Input
                    label="Name"
                    value={name}
                    onChangeText={text=>setName(text)}
                    onSubmitEditing={()=>{
                        setName(name.trim());
                        emailRef.current.focus();
                    }}
                    onBlur={()=>setName(name.trim())}
                    placeholder="Name"
                    returnKeyType="next"
                />
                <Input
                    ref={emailRef}
                    label="Email"
                    value={email}
                    onChangeText={text=>setEmail(removeWhitespace(text))}
                    onSubmitEditing={()=>passwordRef.current.focus()}
                    placeholder="Email"
                    returnKeyType="next"
                />
                <Input
                    ref={passwordRef}
                    label="Password"
                    value={password}
                    onChangeText={text=>setPassword(removeWhitespace(text))}
                    onSubmitEditing={()=>passwordConfirmRef.current.focus()}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword 
                />
                <Input
                    ref={passwordConfirmRef}
                    label="Password Confirm"
                    value={passwordConfirm}
                    onChangeText={text => setPasswordConfirm(removeWhitespace(text))}
                    onSubmitEditing={_handleSignupButtonPress}
                    placeholder="Password"
                    returnKeyType="done"
                    isPassword
                />
                <ErrorText>{ errorMessage }</ErrorText>
                <Button title="Signup" onPress={_handleSignupButtonPress} disabled={disabled}/>
            </Container>
        </KeyboardAwareScrollView>
    );
};

export default Signup;