import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

import {Profile} from '../../models/Profile';

export interface ProfileDetailProps {
  profile: Profile;
  onPress?: () => void;
}

const styles = StyleSheet.create({
  wrapper: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'solid',
    borderRadius: 8,
    padding: 16,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  field: {
    fontSize: 16,
  },
});

const ProfileDetails: React.FC<ProfileDetailProps> = ({profile, onPress}) => (
  <Pressable onPress={onPress}>
    <View style={styles.wrapper}>
      <Text style={styles.field}>
        Name: {profile.firstName} {profile.lastName}
      </Text>
      <Text style={styles.field}>Email: {profile.email}</Text>
    </View>
  </Pressable>
);

export default ProfileDetails;
