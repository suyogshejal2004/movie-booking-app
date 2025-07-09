import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  Pressable,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import axios from 'axios';
import responsive from '../component /responsiveui';

const API_KEY = '6ac52cb9';
const searchTerms = ['Batman', 'Avengers', 'Spiderman'];

export default function Onboarding1({ navigation }) {
  const [images, setImages] = useState([]);
  const [upcomingMovies, setUpcomingMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const allPosters = [];

        for (const term of searchTerms) {
          const response = await axios.get(`http://www.omdbapi.com/?apikey=${API_KEY}&s=${term}`);
          if (response.data.Search) {
            const posters = response.data.Search.filter(movie => movie.Poster !== 'N/A');
            allPosters.push(...posters.map(movie => ({ uri: movie.Poster })));
          }
        }

        setImages(allPosters.slice(0, 10));
        setUpcomingMovies(allPosters.slice(10, 17)); // You can adjust slice as needed
      } catch (error) {
        console.error('Error fetching movie posters:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <LinearGradient style={styles.linearGradient} colors={['#1F1F1F', '#121011']}>
      <View>
        <Pressable onPress={() => navigation.navigate('homescreen')}>
          <Text style={styles.skipText}>Skip</Text>
        </Pressable>

        {loading ? (
          <ActivityIndicator size="large" color="#EB2F3D" style={{ marginTop: 40 }} />
        ) : (
          <>
            <ScrollView
              style={styles.scrollView}
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {images.map((item, index) => (
                <Image key={index} source={item} style={styles.image} />
              ))}
            </ScrollView>

            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {upcomingMovies.map((item, index) => (
                <Image key={index} source={item} style={styles.image} />
              ))}
            </ScrollView>
          </>
        )}

        <View style={styles.bottomContainer}>
          <Text style={styles.txt}>Tell us about your</Text>
          <Text style={styles.txt}>favourite movies genre</Text>

          <TouchableOpacity
            style={styles.btn}
            onPress={() => navigation.navigate('onboarding2')}
          >
            <Text style={styles.btnText}>Next</Text>
          </TouchableOpacity>

          <View
            style={{
              alignItems: 'center',
              marginTop: responsive.marginTop(25),
              justifyContent: 'center',
              flexDirection: 'row',
              gap: responsive.gap(10),
            }}
          >
            <View style={{ flexDirection: 'row', gap: responsive.gap(4) }}>
              <View
                style={{
                  backgroundColor: '#EB2F3D',
                  height: responsive.height(5),
                  width: responsive.width(90),
                  borderRadius: responsive.borderRadius(19),
                }}
              />
              <View
                style={{
                  height: responsive.height(5),
                  borderRadius: responsive.borderRadius(19),
                  width: responsive.width(90),
                  backgroundColor: '#1E1E1E',
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  scrollView: {
    marginTop: responsive.margin(20),
  },
  skipText: {
    fontSize: responsive.fontSize(16),
    textAlign: 'right',
    marginRight: responsive.margin(30),
    marginTop: responsive.margin(30),
    color: '#D4D4D4',
  },
  image: {
    height: responsive.height(182),
    width: responsive.width(133),
    margin: responsive.margin(4),
    borderRadius: responsive.borderRadius(10),
  },
  txt: {
    color: 'white',
    fontSize: responsive.fontSize(20),
    textAlign: 'center',
  },
  bottomContainer: {
    alignContent: 'center',
    marginTop: responsive.margin(80),
  },
  btn: {
    marginTop: responsive.margin(40),
    backgroundColor: '#EB2F3D',
    padding: responsive.padding(12),
    borderRadius: responsive.borderRadius(10),
    marginHorizontal: responsive.margin(20),
  },
  btnText: {
    color: 'white',
    textAlign: 'center',
    fontSize: responsive.fontSize(20),
  },
});
