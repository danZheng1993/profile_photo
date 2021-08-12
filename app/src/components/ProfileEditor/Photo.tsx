import React from 'react';
import {Dimensions, Image, StyleSheet, View} from 'react-native';
import {ProfilePhoto} from '../../models/Profile';

export interface PhotoProps {
  details: ProfilePhoto;
}

const {width} = Dimensions.get('window');

export const IMG_WIDTH = (width - 16 * 4) / 3;
export const IMG_HEIGHT = IMG_WIDTH * 1.4;

const styles = StyleSheet.create({
  wrapper: {
    width: IMG_WIDTH,
    height: IMG_HEIGHT,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#ccc',
  },
  image: {
    flex: 1,
  },
});

const Photo: React.FC<PhotoProps> = ({details}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={{uri: details.url}} style={styles.image} />
    </View>
  );
};

export default Photo;
