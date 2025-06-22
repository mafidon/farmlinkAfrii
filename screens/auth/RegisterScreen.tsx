import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { AuthStackNavigationProp } from '../../navigation/types';
import { Button, Input, Card } from '../../components';
import { COLORS, SPACING, FONT_SIZES, FONT_WEIGHTS } from '../../constants';
import { supabase } from '../../services/supabase';
import { UserRole } from '../../services/supabase/types';

interface RoleOption {
  role: UserRole;
  title: string;
  description: string;
  icon: string;
}

const roleOptions: RoleOption[] = [
  {
    role: 'FARMER',
    title: 'Farmer',
    description: 'List and sell your agricultural products directly to buyers',
    icon: '🌾',
  },
  {
    role: 'BUYER',
    title: 'Buyer',
    description: 'Purchase quality agricultural products from verified farmers',
    icon: '🛒',
  },
  {
    role: 'INVESTOR',
    title: 'Investor',
    description: 'Invest in farming projects and earn returns',
    icon: '💰',
  },
];

export default function RegisterScreen() {
  const navigation = useNavigation<AuthStackNavigationProp>();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!selectedRole) {
      newErrors.role = 'Please select a role';
    }

    if (!formData.fullName) {
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      setLoading(true);

      // Sign up the user
      const { data: authData, error: signUpError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
            role: selectedRole,
          },
        },
      });

      if (signUpError) throw signUpError;

      // Create the user profile
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: authData.user!.id,
            full_name: formData.fullName,
            email: formData.email,
            role: selectedRole,
          },
        ]);

      if (profileError) throw profileError;

      Alert.alert(
        'Registration Successful',
        'Please check your email to verify your account.',
        [{ text: 'OK', onPress: () => navigation.navigate('Login') }]
      );
    } catch (error) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Create Account</Text>
          <Text style={styles.subtitle}>
            Join FarmLink Africa and start your journey
          </Text>
        </View>

        <View style={styles.roleSelection}>
          <Text style={styles.sectionTitle}>Select your role</Text>
          <View style={styles.roleOptions}>
            {roleOptions.map((option) => (
              <TouchableOpacity
                key={option.role}
                onPress={() => setSelectedRole(option.role)}
                style={[styles.roleCard, selectedRole === option.role && styles.selectedRole]}
              >
                <Text style={styles.roleIcon}>{option.icon}</Text>
                <Text style={styles.roleTitle}>{option.title}</Text>
                <Text style={styles.roleDescription}>{option.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.role && <Text style={styles.errorText}>{errors.role}</Text>}
        </View>

        <View style={styles.form}>
          <Input
            label="Full Name"
            value={formData.fullName}
            onChangeText={(text) => setFormData({ ...formData, fullName: text })}
            icon="user"
            error={errors.fullName}
            placeholder="Enter your full name"
          />

          <Input
            label="Email"
            value={formData.email}
            onChangeText={(text) => setFormData({ ...formData, email: text })}
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            icon="mail"
            error={errors.email}
            placeholder="Enter your email"
          />

          <Input
            label="Password"
            value={formData.password}
            onChangeText={(text) => setFormData({ ...formData, password: text })}
            secureTextEntry
            icon="lock"
            error={errors.password}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            value={formData.confirmPassword}
            onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
            secureTextEntry
            icon="lock"
            error={errors.confirmPassword}
            placeholder="Confirm your password"
          />

          <Button
            title="Create Account"
            onPress={handleRegister}
            loading={loading}
            size="large"
            style={styles.button}
          />
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerLink}>Login</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    padding: SPACING.xl,
  },
  header: {
    marginBottom: SPACING.xl,
  },
  title: {
    fontSize: FONT_SIZES.xxl,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  subtitle: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  roleSelection: {
    marginBottom: SPACING.xl,
  },
  sectionTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.semibold,
    color: COLORS.text.primary,
    marginBottom: SPACING.md,
  },
  roleOptions: {
    gap: SPACING.md,
  },
  roleCard: {
    padding: SPACING.lg,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: COLORS.border,
    backgroundColor: COLORS.background,
  },
  selectedRole: {
    borderColor: COLORS.primary,
    backgroundColor: COLORS.primary + '10',
  },
  roleIcon: {
    fontSize: FONT_SIZES.xl,
    marginBottom: SPACING.sm,
  },
  roleTitle: {
    fontSize: FONT_SIZES.lg,
    fontWeight: FONT_WEIGHTS.bold,
    color: COLORS.text.primary,
    marginBottom: SPACING.xs,
  },
  roleDescription: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.text.secondary,
  },
  form: {
    gap: SPACING.md,
  },
  button: {
    marginTop: SPACING.md,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: SPACING.xl,
  },
  footerText: {
    fontSize: FONT_SIZES.md,
    color: COLORS.text.secondary,
  },
  footerLink: {
    fontSize: FONT_SIZES.md,
    color: COLORS.primary,
    fontWeight: FONT_WEIGHTS.bold,
  },
  errorText: {
    fontSize: FONT_SIZES.sm,
    color: COLORS.error,
    marginTop: SPACING.xs,
  },
});