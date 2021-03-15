import React from 'react';
import styled from 'styled-components/native';
import PropTypes from 'prop-types';

const TRANSPARENT = 'transparent';

const Container = styled.TouchableOpacity`
    background-color:${({theme, isFilled}) => isFilled ? theme.buttonBackground : TRANSPARENT};
    align-items : center;
    border-radius : 4px;
    width:100%;
    padding:10px;
`;

const Title = styled.Text`
    height:30px;
    line-height:30px;
    font-size:16px;
    color: ${({theme, isFilled})=>isFilled ? theme.buttonTitle : theme.buttonUnfilledTitle};
`;

const Button = () => {
    return (
        <div>
            
        </div>
    );
};

export default Button;