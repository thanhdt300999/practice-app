import React, { useContext } from 'react';
import { View, StyleSheet, Text, ImageBackground, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NavigationEvents } from 'react-navigation';
import AuthForm from '../components/AuthForm';
import NavLink from '../components/NavLink';
import { Context } from '../context/AuthContext';

const SigninScreen = () => {
  const { state, signin, clearErrorMessage } = useContext(Context);

  return (

    <View style={styles.container}>
      <ImageBackground source={require('../../image/Capture.png')} style={styles.image}>
        <Image
          style={styles.tinyLogo}
          source={require('../../image/logo-large.png')}
        />
      </ImageBackground>
      {/* <NavigationEvents onWillFocus={clearErrorMessage} />
      <AuthForm
        headerText="Sign In to Your Account"
        errorMessage={state.errorMessage}
        onSubmit={signin}
        submitButtonText="Sign In"
      />
      <NavLink
        text="Dont have an account? Sign up instead"
        routeName="Signup"
      /> */}
    </View>
  );
};

SigninScreen.navigationOptions = {
  header: () => true,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 50
  },
  tinyLogo: {
    alignSelf: 'center',
    flex: 1,
    width: 300,
    height: null,
    resizeMode: 'contain'
  },
  image: {
    height: "100%",
    width: "100%"
  },
});

export default SigninScreen;
