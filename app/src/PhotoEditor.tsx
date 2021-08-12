import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {useDispatch} from 'react-redux';

import ProfileEditor from './components/ProfileEditor';
import ProfileSelector from './components/ProfileSelector';

import {getProfiles} from './redux/slices/profiles';

const PhotoEditor: React.FC = () => {
  const dispatch = useDispatch();
  const [profileId, setCurrentProfile] = useState<number | undefined>(
    undefined,
  );
  useEffect(() => {
    dispatch(getProfiles());
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      {profileId ? (
        <ProfileEditor profileId={profileId} />
      ) : (
        <ProfileSelector onSelect={setCurrentProfile} />
      )}
    </SafeAreaView>
  );
};

export default PhotoEditor;
