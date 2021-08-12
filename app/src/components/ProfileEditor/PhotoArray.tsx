import React, {useCallback, useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {DragSortableView} from 'react-native-drag-sort';

import Photo, {IMG_HEIGHT, IMG_WIDTH} from './Photo';

import {ProfilePhoto} from '../../models/Profile';

export interface PhotoArrayProps {
  photos: ProfilePhoto[];
  handleDelete: (index: number) => void;
  updatePhotos: (newPhotos: ProfilePhoto[]) => void;
}

const {width} = Dimensions.get('window');

const WRAPPER_WIDTH = width - 32;

const isChanged = (oldPhotos: ProfilePhoto[], newPhotos: ProfilePhoto[]) => {
  if (oldPhotos.length !== newPhotos.length) {
    return true;
  }
  for (let i = 0; i < oldPhotos.length; i++) {
    if (oldPhotos[i].id !== newPhotos[i].id) {
      return true;
    }
  }
  return false;
};

const PhotoArray: React.FC<PhotoArrayProps> = ({
  photos,
  updatePhotos,
  handleDelete,
}) => {
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isEnterEdit, setIsEnterEdit] = useState(false);
  const renderItem = (item: ProfilePhoto, index: number) => (
    <Photo details={item} onDelete={() => handleDelete(index)} />
  );
  console.log(photos);
  return (
    <ScrollView style={{flex: 1}} scrollEnabled={scrollEnabled}>
      <DragSortableView
        sortable={photos.length > 1}
        dataSource={photos}
        parentWidth={WRAPPER_WIDTH}
        childrenWidth={IMG_WIDTH}
        childrenHeight={IMG_HEIGHT}
        marginChildrenTop={8}
        marginChildrenBottom={0}
        marginChildrenLeft={0}
        marginChildrenRight={8}
        onDragStart={() => {
          if (!isEnterEdit) {
            setIsEnterEdit(true);
            setScrollEnabled(false);
          } else {
            setScrollEnabled(false);
          }
        }}
        onDragEnd={() => {
          setScrollEnabled(true);
        }}
        onDataChange={(data) => {
          if (isChanged(data, photos)) {
            updatePhotos(data);
          }
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
        key={photos.map((photo) => photo.id).join('-')}
      />
    </ScrollView>
  );
};

export default PhotoArray;
