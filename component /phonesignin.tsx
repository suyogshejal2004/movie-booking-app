import { View, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { Auth } from 'firebase/auth';
const PhoneNumber = () => {
    const [confirm, setConfirm] = useState(null);
    console.log("Conform",confirm)
      async function handleSignInWithPhoneNumber(phoneNumber) {
    const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
    setConfirm(confirmation);
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'red',
      }}
    >
      <View
        style={{
          alignSelf: 'center',
          marginTop: 100,
        }}
      >
         <Button
        title="Phone Number Sign In"
        onPress={() => handleSignInWithPhoneNumber('+1 650-555-3434')}
      />
      </View>
    </View>
  );
};
export default PhoneNumber;
