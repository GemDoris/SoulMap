import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Bell, Settings } from 'lucide-react-native';

export function HomeHeader() {
  return (
    <View style={styles.header}>
      <View style={styles.userInfo}>
        <Image
          source={{ uri: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg' }}
          style={styles.userImage}
        />
        <View>
          <Text style={styles.greeting}>Good morning,</Text>
          <Text style={styles.userName}>Sarah</Text>
        </View>
      </View>
      <View style={styles.actions}>
        <TouchableOpacity style={styles.iconButton}>
          <Bell size={24} color="#718096" />
          <View style={styles.notificationBadge} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Settings size={24} color="#718096" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  greeting: {
    fontFamily: 'Poppins-Regular',
    fontSize: 14,
    color: '#718096',
  },
  userName: {
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
    color: '#2D3748',
  },
  actions: {
    flexDirection: 'row',
  },
  iconButton: {
    position: 'relative',
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 8,
  },
  notificationBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E84393',
  },
});