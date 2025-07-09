import React, { useState } from 'react';
import {
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from 'react-native';
import responsive from '../component /responsiveui';

const genreList = [
  'Action', 'Adventure', 'Drama', 'Comedy',
  'Crime', 'Documentary', 'Sports', 'Fantasy',
  'Horror', 'Western', 'Music', 'Thriller',
  'Sci-Fi',
];

export default function Onboarding2({ navigation }) {
  const [selectedGenres, setSelectedGenres] = useState([]);

  const toggleGenre = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((g) => g !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#121011' }}>
      <Pressable onPress={() => navigation.navigate('homescreen')}>
        <Text style={styles.skipText}>Skip</Text>
      </Pressable>

      <View style={styles.container}>
        {/* Genres Grid */}
        <View style={styles.genreGrid}>
          {genreList.map((genre, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => toggleGenre(genre)}
              style={[
                styles.genreItem,
                selectedGenres.includes(genre) && styles.selectedGenreItem,
              ]}
            >
              <Text
                style={[
                  styles.genreText,
                  selectedGenres.includes(genre) && styles.selectedGenreText,
                ]}
              >
                {genre}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Bottom Section */}
        <View style={styles.bottomContainer}>
          <Text style={styles.bottomText}>Select the genres you</Text>
          <Text style={styles.bottomText}>like to watch</Text>

          <Pressable
            onPress={() => navigation.navigate('SigninSCreen')}
            style={styles.nextButton}
          >
            <Text style={styles.nextButtonText}>Next</Text>
          </Pressable>

          <View style={styles.paginationDots}>
            <View style={styles.inactiveDot} />
            <View style={styles.activeDot} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  skipText: {
    textAlign: 'right',
    marginRight: responsive.marginRight(15),
    marginTop: responsive.marginTop(30),
    fontSize: responsive.fontSize(16),
    color: '#D4D4D4',
  },
  container: {
    marginTop: responsive.marginTop(60),
    flex: 1,
    alignItems: 'center',
  },
  genreGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: responsive.margin(10),
    gap: responsive.gap(10),
  },
  genreItem: {
    backgroundColor: '#1F1B1B',
    paddingHorizontal: responsive.paddingHorizontal(18),
    paddingVertical: responsive.paddingVertical(10),
    borderRadius: responsive.borderRadius(8),
    margin: 4,
  },
  selectedGenreItem: {
    backgroundColor: '#EB2F3D',
  },
  genreText: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(14),
  },
  selectedGenreText: {
    fontWeight: 'bold',
  },
  bottomContainer: {
    alignItems: 'center',
    marginTop: responsive.marginTop(140),
  },
  bottomText: {
    fontSize: responsive.fontSize(20),
    color: '#FFFFFF',
  },
  nextButton: {
    backgroundColor: '#EB2F3D',
    marginTop: responsive.marginTop(30),
    paddingHorizontal: responsive.paddingHorizontal(150),
    paddingVertical: responsive.paddingVertical(10),
    borderRadius: responsive.borderRadius(10),
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: responsive.fontSize(16),
  },
  paginationDots: {
    flexDirection: 'row',
    gap: responsive.gap(6),
    marginTop: responsive.marginTop(20),
  },
  inactiveDot: {
    height: responsive.height(7),
    width: responsive.width(90),
    backgroundColor: '#1E1E1E',
    borderRadius: responsive.borderRadius(20),
  },
  activeDot: {
    height: responsive.height(7),
    width: responsive.width(90),
    backgroundColor: '#EB2F3D',
    borderRadius: responsive.borderRadius(20),
  },
});
