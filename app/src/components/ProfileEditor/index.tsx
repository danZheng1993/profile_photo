import React, {useCallback, useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {useSelector} from 'react-redux';

import PhotoArray from './PhotoArray';

import {fetchPhotos, postPhoto} from '../../api';
import {ProfilePhoto} from '../../models/Profile';
import {selectProfile} from '../../redux/selectors/profiles';

export interface ProfileEditorProps {
  profileId: number;
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

const ProfileEditor: React.FC<ProfileEditorProps> = ({profileId}) => {
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
      position: 0,
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
  return (
    <View style={styles.wrapper}>
      <View style={styles.userDetailsWrapper}>
        <Text style={styles.username}>
          {profile?.firstName} {profile?.lastName}
        </Text>
        <Text style={styles.addCTA} onPress={handleAdd}>
          Add New Photo
        </Text>
      </View>
      <PhotoArray photos={photos} />
    </View>
  );
};

export default ProfileEditor;
