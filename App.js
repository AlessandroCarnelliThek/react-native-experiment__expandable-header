import { StatusBar } from 'expo-status-bar';
import React from 'react';
import {
  StyleSheet,
  Dimensions,
  Text,
  View,
  ScrollView,
} from 'react-native';
import costants from './config/costants'
import ExpandableHeader from './component/ExpandableHeader'

const { COLOR_BG, COLOR_ITEM } = costants
const { width } = Dimensions.get('window')


export default function App() {
  return (
    <View style={styles.page}>

      {/* :::::::EXAMPLE CONTENT  - START ------------------*/}
      <ScrollView showsVerticalScrollIndicator={false} >
        <View style={{ height: 140 }} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
      </ScrollView>
      {/* --------------------- EXAMPLE CONTENT - END::::::: */}


      <ExpandableHeader title={'HEADER'} >
        {/* :::::::HEADER_CONTENT - START -----------------------*/}

        <Text style={[styles.text, styles.spacing, { textAlign: 'center' }]}>(Found Among the Papers of the Late Francis Wayland Thurston, of Boston)</Text>
        <Text style={[styles.text, styles.spacing, { textAlign: 'justify' }]}>“Of such great powers or beings there may be conceivably a survival . . . a survival of a hugely remote period when . . . consciousness was manifested, perhaps, in shapes and forms long since withdrawn before the tide of advancing humanity . . . forms of which poetry and legend alone have caught a flying memory and called them gods, monsters, mythical beings of all sorts and kinds. . . .”</Text>
        <Text style={[styles.text, { textAlign: 'right' }]}>—Algernon Blackwood.</Text>

        {/* ------------------------ HEADER_CONTENT - END::::::: */}
      </ExpandableHeader>

      <StatusBar style="auto" />
    </View >
  )
}

const styles = StyleSheet.create({
  page: {
    backgroundColor: COLOR_BG,
    width: width,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    backgroundColor: COLOR_ITEM,
    width: width * .8,
    height: width * .4,
    borderRadius: 10,
    marginVertical: 20,
  },
  text: {
    color: COLOR_BG,
    fontSize: 16,
    fontWeight: '100',
  },
  spacing: {
    paddingBottom: 40,
  },
})
