import React from 'react';
import {StyleSheet, FlatList} from 'react-native';
import {useSelector} from 'react-redux';

import ProfileDetails from './ProfileDetails';

import {Profile} from '../../models/Profile';
import {selectProfiles} from '../../redux/selectors/profiles';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    padding: 16,
  },
});

export interface ProfileSelectorProps {
  onSelect: (profileId: number) => void;
}

const ProfileSelector: React.FC<ProfileSelectorProps> = ({onSelect}) => {
  const profiles = useSelector(selectProfiles);
  const renderProfile = ({item}: {item: Profile}) => (
    <ProfileDetails profile={item} onPress={() => onSelect(item.id)} />
  );
  return (
    <FlatList
      data={profiles}
      renderItem={renderProfile}
      keyExtractor={(profiles: Profile) => `profile_${profiles.id}`}
    />
  );
};

export default ProfileSelector;
