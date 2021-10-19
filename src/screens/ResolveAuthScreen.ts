import React, { useEffect, useContext } from 'react';

const ResolveAuthScreen = ({ navigation }) => {
    useEffect(() => {
        navigation.navigate('Signin');
    }, []);

    return null;
};

export default ResolveAuthScreen;
