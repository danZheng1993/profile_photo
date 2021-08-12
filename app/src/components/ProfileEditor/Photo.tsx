import React from 'react';
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {ProfilePhoto} from '../../models/Profile';

export interface PhotoProps {
  details: ProfilePhoto;
  onDelete: () => void;
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
  closeWrapper: {
    position: 'absolute',
    width: 48,
    height: 48,
    bottom: -24,
    right: -24,
    paddingRight: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{rotate: '45deg'}],
  },
  close: {
    color: '#f00',
    fontSize: 14,
    transform: [{rotate: '-45deg'}],
  },
});

const Photo: React.FC<PhotoProps> = ({details, onDelete}) => {
  return (
    <View style={styles.wrapper}>
      <Image source={{uri: details.url}} style={styles.image} />
      <Pressable style={styles.closeWrapper} onPress={onDelete}>
        <Text style={styles.close}>X</Text>
      </Pressable>
    </View>
  );
};

export default Photo;
