import React, {useEffect, useState} from 'react';
import {Dimensions, ScrollView} from 'react-native';
import {DragSortableView} from 'react-native-drag-sort';

import Photo, {IMG_WIDTH} from './Photo';

import {ProfilePhoto} from '../../models/Profile';

export interface PhotoArrayProps {
  photos: ProfilePhoto[];
}

const {width} = Dimensions.get('window');

const WRAPPER_WIDTH = width - 32;

const PhotoArray: React.FC<PhotoArrayProps> = ({photos}) => {
  const [stPhotos, setPhotos] = useState(photos);
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [isEnterEdit, setIsEnterEdit] = useState(false);
  useEffect(() => {
    setPhotos(photos);
  }, [photos]);
  const renderItem = (item: ProfilePhoto) => <Photo details={item} />;
  return (
    <ScrollView style={{flex: 1}} scrollEnabled={scrollEnabled}>
      <DragSortableView
        sortable={stPhotos.length > 1}
        dataSource={stPhotos}
        parentWidth={WRAPPER_WIDTH}
        childrenWidth={IMG_WIDTH}
        childrenHeight={IMG_WIDTH}
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
          if (data.length != stPhotos.length) {
            setPhotos(data);
          }
        }}
        onClickItem={(data, item, index) => {
          // click delete
          if (isEnterEdit) {
            const newData = [...data];
            newData.splice(index, 1);
            setPhotos(newData);
          }
        }}
        keyExtractor={(item, index) => item.id}
        renderItem={(item, index) => renderItem(item)}
        key={stPhotos}
      />
    </ScrollView>
  );
};

export default PhotoArray;
