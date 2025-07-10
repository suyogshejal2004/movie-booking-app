import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import responsive from './responsiveui';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const HeaderComponent = ({ navigation }) => {
  const nav = navigation || useNavigation();
  const [username, setUsername] = useState('Guest');
  const [city, setCity] = useState(''); // optional

  const fetchUserInfo = async () => {
    try {
      const currentUser = auth().currentUser;
      if (currentUser) {
        const doc = await firestore().collection('users').doc(currentUser.uid).get();
        if (doc.exists) {
          const data = doc.data();
          setUsername(data?.name?.trim() || 'User');
          setCity(data?.city?.trim() || ''); // optional
        } else {
          setUsername('User');
        }
      } else {
        setUsername('Guest');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
      setUsername('Guest');
    }
  };

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useFocusEffect(
    useCallback(() => {
      fetchUserInfo();
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.usertxt}>Hi, {username}</Text>
        <Pressable onPress={() => console.log('Location pressed')}>
          <Text style={styles.locationtxt}>
            {city || 'Pandharpur'} &gt;
          </Text>
        </Pressable>
      </View>

      <View style={styles.btncontainer}>
        <TouchableOpacity
          onPress={() => nav.navigate('SearchScreen')}
          style={styles.btnicon}
        >
          <Icon name="search-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>

        <Pressable
          onPress={() => nav.navigate('AccountInfoScreen')}
          style={styles.btnicon}
        >
          <Icon name="person-outline" size={24} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: responsive.paddingTop(30),
    paddingLeft: responsive.paddingLeft(10),
    paddingRight: responsive.paddingRight(16),
    paddingBottom: 10,
  },
  usertxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 20,
  },
  locationtxt: {
    color: '#eb2f3d',
    fontSize: 16,
  },
  btncontainer: {
    flexDirection: 'row',
  },
  btnicon: {
    backgroundColor: '#1C1C1C',
    marginLeft: 10,
    borderRadius: 40,
    padding: 10,
  },
});
