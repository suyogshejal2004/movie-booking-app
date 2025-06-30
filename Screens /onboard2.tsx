import LottieView from 'lottie-react-native';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import responsive from '../component /responsiveui';

export default function Onboarding2({ navigation }) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121011' }}>
      <Pressable onPress={()=>navigation.navigate('homescreen')}> <Text style={styles.SKiptxt}>Skip </Text></Pressable>
     
      <View style={styles.container}>
        <View style={styles.container2}>
          <Text style={styles.txt}>Action</Text>
          <Text style={styles.txt}>Adventure</Text>
          <Text style={styles.txt2}>Adeventure</Text>
          <Text style={styles.txt}>Drama</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.txt}>Comedy</Text>
          <Text style={styles.txt2}>Crime</Text>
          <Text style={styles.txt}>DOcumentry</Text>
          <Text style={styles.txt}>Sports</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.txt}>Fantsy</Text>
          <Text style={styles.txt}>horor</Text>
          <Text style={styles.txt}>Wastern</Text>
          <Text style={styles.txt2}>Music</Text>
        </View>
        <View style={styles.container2}>
          <Text style={styles.txt}>Horor</Text>
          <Text style={styles.txt2}>Thirller</Text>
          <Text style={styles.txt}>Sci-FI</Text>
        </View>
        <View
          style={{ alignItems: 'center', marginTop: responsive.marginTop(170) }}
        >
          <Text style={styles.bottomtxt}>Select the genres you</Text>
          <Text style={styles.bottomtxt}>like to watch</Text>
          <Pressable onPress={()=>navigation.navigate('SigninSCreen')} style={styles.btn}>
            <Text style={styles.btnTtx}>Next</Text>
          </Pressable>
          <View style={{flexDirection:'row', gap:responsive.gap(6)}}>  <View
            style={{
              marginTop:responsive.marginTop(19),
              height: responsive.height(7
              ),
              width: responsive.width(90),
              backgroundColor: '#1E1E1E',
            }}
          />
           <View
            style={{
              marginTop:responsive.marginTop(19),
              height: responsive.height(7
              ),
              width: responsive.width(90),
              backgroundColor: '#EB2F3D',
            }}
          /></View>
        
        </View>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  btn: { backgroundColor: '#EB2F3D', 
    marginTop:responsive.marginTop(30),
    paddingHorizontal: responsive.paddingHorizontal(150),
    paddingVertical: responsive.paddingVertical(10),
    borderRadius: responsive.borderRadius(10),
  },
  container: {
  marginTop: responsive.marginTop(120),
    alignContent: 'center',
    justifyContent: 'center',
    marginBottom: responsive.marginBottom(100),
  },
  container2: {
    flexDirection: 'row',
    margin: responsive.margin(4) ,
    gap:responsive.gap(4) ,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
  },

  bottomtxt: {
    fontSize: responsive.fontSize(20),

    color: '#FFFFFF',
  },
  SKiptxt: {
    textAlign: 'right',
    marginRight: responsive.marginRight(15),
    marginTop: responsive.marginTop(30),
    fontSize: responsive.fontSize(16),
    color: '#D4D4D4',
  },
  txt: {
    color: '#FFFFFF',
    paddingHorizontal: responsive.paddingHorizontal(17),
    paddingVertical: responsive.paddingVertical(10),

    backgroundColor: '#1F1B1B',
  },
  txt2: {
    color: '#FFFFFF',
    paddingHorizontal: responsive.paddingHorizontal(17),
    paddingVertical: responsive.marginVertical(10),
    

    backgroundColor: '#EB2F3D',
  },
  btnTtx: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(16),
  },
});
