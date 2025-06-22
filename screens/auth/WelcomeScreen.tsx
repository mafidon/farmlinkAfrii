import React from 'react';
import { View, Text, ImageBackground, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { Button } from '../../components';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS, ASSETS } from '../../constants';

export default function WelcomeScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();

  return (
    <ImageBackground
      source={ASSETS.WELCOME_BG}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <SafeAreaView style={styles.container}>
          <View style={styles.content}>
            <View style={styles.logoContainer}>
              <Text style={styles.title}>FarmLink Africa</Text>
              <Text style={styles.subtitle}>
                Connecting farmers, buyers, and investors across Africa
              </Text>
            </View>

            <View style={styles.buttonContainer}>
              <Button
                title="Get Started"
                onPress={() => navigation.navigate('Register')}
                size="large"
                style={styles.button}
              />
              <Button
                title="Login"
                onPress={() => navigation.navigate('Login')}
                variant="outline"
                size="large"
                style={styles.button}
              />
            </View>
          </View>
        </SafeAreaView>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
    padding: SPACING.xl,
  },
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.inverse,
    textAlign: 'center',
    marginBottom: SPACING.sm,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.inverse,
    textAlign: 'center',
    opacity: 0.9,
  },
  buttonContainer: {
    gap: SPACING.md,
  },
  button: {
    width: '100%',
  },
});