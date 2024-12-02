import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import axios from 'axios';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';

const OTPVerification = ({navigation}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  const sendOtp = async () => {
    try {
      const response = await axios.post(
        'https://api.twilio.com/2010-04-01/Accounts/{AccountSID}/Messages.json',
        {
          To: phoneNumber,
          From: 'Your Twilio Number',
          Body: 'Your OTP is: 123456',
        },
        {
          auth: {
            username: 'AccountSID',
            password: 'AuthToken',
          },
        },
      );
      console.log('res---', response.data);
      if (response.data.success) {
        Alert.alert('OTP Sent', 'Please check your phone for the OTP.');
        setOtpSent(true);
        setIsResendDisabled(true);
      } else {
        Alert.alert('Error', response.data.message || 'Failed to send OTP.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await axios.post('https://your-backend-api/verify-otp', {
        phone: phoneNumber,
        otp,
      });
      if (response.data.success) {
        Alert.alert('Success', 'OTP Verified Successfully!');
        navigation.navigate('Home'); // Redirect to Home page
      } else {
        Alert.alert('Invalid OTP', 'The OTP you entered is incorrect.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Something went wrong. Please try again later.');
    }
  };

  const onTimerComplete = () => {
    setIsResendDisabled(false);
  };

  return (
    <View style={styles.container}>
      {!otpSent ? (
        <>
          <Text style={styles.label}>Enter Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            // keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            editable={true}
          />
          <TouchableOpacity style={styles.button} onPress={sendOtp}>
            <Text style={styles.buttonText}>Send OTP</Text>
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>Enter OTP</Text>
          <TextInput
            style={styles.input}
            placeholder="OTP"
            keyboardType="number-pad"
            value={otp}
            onChangeText={setOtp}
          />
          <TouchableOpacity style={styles.button} onPress={verifyOtp}>
            <Text style={styles.buttonText}>Verify OTP</Text>
          </TouchableOpacity>
          <View style={styles.timer}>
            <CountdownCircleTimer
              isPlaying={isResendDisabled}
              duration={30}
              colors={['#004777', '#F7B801', '#A30000']}
              colorsTime={[20, 10, 0]}
              onComplete={onTimerComplete}>
              {({remainingTime}) => <Text>{remainingTime}s</Text>}
            </CountdownCircleTimer>
          </View>
          <TouchableOpacity
            style={[styles.button, isResendDisabled && styles.disabledButton]}
            disabled={isResendDisabled}
            onPress={sendOtp}>
            <Text style={styles.buttonText}>Resend OTP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  timer: {
    marginVertical: 20,
    alignItems: 'center',
  },
});

export default OTPVerification;
