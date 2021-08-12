import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import PhotoArray from './PhotoArray';

import {deletePhoto, fetchPhotos, postPhoto, updatePhoto} from '../../api';
import {ProfilePhoto} from '../../models/Profile';
import {selectProfile} from '../../redux/selectors/profiles';

export interface ProfileEditorProps {
  profileId: number;
  onBack: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingVertical: 16,
    margin: 16,
  },
  userDetailsWrapper: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderStyle: 'solid',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  username: {
    fontSize: 16,
  },
  addCTA: {
    fontSize: 14,
    color: '#999',
  },
});

const ProfileEditor: React.FC<ProfileEditorProps> = ({profileId, onBack}) => {
  const profile = useSelector(selectProfile(profileId));
  const [photos, setPhotos] = useState<ProfilePhoto[]>([]);
  const fetchProfilePhotos = useCallback(
    async (profileId: number) => {
      setPhotos([]);
      try {
        const result = await fetchPhotos(profileId);
        setPhotos(result.data);
      } catch {
        console.log('error');
      }
    },
    [setPhotos],
  );
  useEffect(() => {
    if (profileId) {
      fetchProfilePhotos(profileId);
    }
  }, [profileId]);

  const handleAdd = useCallback(async () => {
    const newPhoto = {
      url: 'https://placeimg.com/640/480/any',
      width: 640,
      height: 480,
      position:
        photos.length === 0 ? 0 : photos[photos.length - 1].position + 1,
      centerX: 320,
      centerY: 240,
    };
    try {
      const result = await postPhoto(profileId, newPhoto);
      setPhotos([...photos, result.data]);
    } catch {
      console.log('error');
    }
  }, [photos, profileId]);

  const updatePhotos = (newPhotos: ProfilePhoto[]) => {
    for (let i = 0; i < newPhotos.length; i++) {
      const {id, ...photoInfo} = newPhotos[i];
      updatePhoto(id, {...photoInfo, position: i});
    }
  };

  const handleDelete = useCallback(
    (index: number) => {
      const newData = [...photos];
      const photoId = photos[index].id;
      deletePhoto(photoId);
      newData.splice(index, 1);
      setPhotos(newData);
    },
    [photos, setPhotos],
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.addCTA} onPress={onBack}>
        Back
      </Text>
      <View style={styles.userDetailsWrapper}>
        <Text style={styles.username}>
          {profile?.firstName} {profile?.lastName}
        </Text>
        <Text style={styles.addCTA} onPress={handleAdd}>
          Add New Photo
        </Text>
      </View>
      <PhotoArray
        photos={photos}
        updatePhotos={updatePhotos}
        handleDelete={handleDelete}
      />
    </View>
  );
};

export default ProfileEditor;
