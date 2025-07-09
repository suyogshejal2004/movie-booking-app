import React from 'react';
import { View, Text, StyleSheet, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import responsive from './responsiveui';
import { useNavigation } from '@react-navigation/native'; // ✅ Added

const HeaderComponent = ({ username = 'Guest', navigation }) => {
  const nav = navigation || useNavigation(); // ✅ fallback if not passed

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.usertxt}>{username}</Text>
        <Pressable onPress={() => console.log('Location pressed')}>
          <Text style={styles.locationtxt}>Pandharpur &gt;</Text>
        </Pressable>
      </View>

      <View style={styles.btncontainer}>
        <TouchableOpacity
          onPress={() => nav.navigate('SearchScreen')} // ✅ safe navigation
          style={styles.btnicon}
        >
          <Icon name="search-outline" size={34} color="#FFFFFF" />
        </TouchableOpacity>

        <Pressable onPress={() => nav.navigate('AccountInfoScreen')}style={styles.btnicon}>
          <Icon name="person-outline" size={34} color="#FFFFFF" />
        </Pressable>
      </View>
    </View>
  );
};

export default HeaderComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor:'#000',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: responsive.paddingTop(30),
    paddingLeft: responsive.paddingLeft(10),
    paddingRight: responsive.paddingRight(16),
  },
  usertxt: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 23,
  },
  locationtxt: {
    color: '#eb2f3d',
    fontSize: 20,
  },
  btncontainer: {
    flexDirection: 'row',
  },
  btnicon: {
    backgroundColor: '#1C1C1C',
    marginRight: 12,
    borderRadius: 42,
    padding: 11,
  },
});
