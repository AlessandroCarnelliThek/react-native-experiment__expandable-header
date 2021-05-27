/*NNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNNN#
mMMMMMMMMMMMMMMMMMmhysoooossydNMMMMMMMMMMMMMMMMMMm
mMMMMMMMMMMMMNy+-   `.----.`   `:ohMMMMMMMMMMMMMMm
mMMMMMMMMMNs-  .+ydNMMMMMMMMMmhs/` `:yMMMMMMMMMMMm
mMMMMMMMm/  -smNMMMMMMMMMMMMMMMMMmdo. `oNMMMMMMMMm
mMMMMMN+  /dd+``hMMMMMMMMMMMMMMM+ .sNy- `sMMMMMMMm
mMMMMd. -dm:     sMMMMMMMMMMMMN:    `oNy` :NMMMMMm
mMMMh  /Ms        +MMMMMMMMMMN-       .dm. .mMMMMm
mMMd  +M+          :NMMMMMMMm.          yN. .NMMMm
mMM. -Ms            -NMMMMMh`            dm  +MMMm
mMy  hN`            /mmyyhNh-            :M/ `NMMm
mM+  My            sN:     oM:            Nh  hMMm
mM: .MdooooooooooooMy       NmooooooooooooNd  yMMm
mM+  MMMMMMMMMMMMMMMN:     oMMMMMMMMMMMMMMMh  hMMm
mMh  hMMMMMMMMMMMMMMMNmyyhmMMMMMMMMMMMMMMMM/ `NMMm
mMM. -MMMMMMMMMMMMMMd` ..` -NMMMMMMMMMMMMMm  +MMMm
mMMd  +MMMMMMMMMMMMy        .mMMMMMMMMMMMN. .NMMMm
mMMMh  /MMMMMMMMMMs          `dMMMMMMMMMm. .mMMMMm
mMMMMd. -dMMMMMMM+            `hMMMMMMMy` :NMMMMMm
mMMMMMN+  /dMMMN:               sMMMMy- `sMMMMMMMm
mMMMMMMMm/  -sNmo:`           ./sMdo. `oNMMMMMMMMm
mMMMMMMMMMNs-  .+ydmdhyysyyhmmhs/` `:yMMMMMMMMMMMm
mMMMMMMMMMMMMNy+-`  `.----.`   `:ohMMMMMMMMMMMMMMm
#MMMMMMMMMMMMMMMMMmdysoooossydNMMMMMMMMMMMMMMMMMM#       

                                                  
           ````      ```````     ```````          
          hMMMm`    .MMMMMMMNh:  +MMMMMMMNy.      
         oMMdMMy    .MMM-`.+MMM- +MMm``.hMMm      
        :MMd dMM/   .MMM-`.oMMN` +MMm``-hMMh      
       `NMM+:+MMN.  .MMMMMMMms.  +MMMMMMMdo`      
       hMMmmmmmMMm` .MMM-``      +MMm```          
      oMMh     hMMy .MMM.        +MMd             
      ```       ```  ```         ````             
_________________________________________________________

  REACT-NATIVE-EXPERIMENT: ' EXPANDABLE ANIMATED HEADER '
_________________________________________________________

  #_Put the content you want in the EXAMPLE HEADER CONTENT AREA.
  
  #_By clicking the switch under the header title, the SHEET 
   will scroll from top to bottom by the height of the content
   and the CONTENT fade-in on the SHEET.

  #_Designed for small contents, not tested with ScrollView and FlatList. 
  
  #_The content in this example are the incipit of a story by H.P. Lovecraft
_________________________________________________________
 
  look at my works and follow me: 
    https://github.com/AlessandroCarnelliThek

-------------------------------------------------------*/


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

      <ScrollView showsVerticalScrollIndicator={false} >
        {/* :::::::PAGE_CONTENT - START -------------------*/}

        <View style={{ height: 140 }} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />
        <View style={styles.item} />

        {/* :::::::PAGE_CONTENT - END ---------------------*/}
      </ScrollView>


      <ExpandableHeader title={'HEADER'} >
        {/* :::::::EXAMPLE_HEADER_CONTENT_AREA - START -----------------------*/}

        <Text style={[styles.text, styles.spacing, { textAlign: 'center' }]}>(Found Among the Papers of the Late Francis Wayland Thurston, of Boston)</Text>
        <Text style={[styles.text, styles.spacing, { textAlign: 'justify' }]}>“Of such great powers or beings there may be conceivably a survival . . . a survival of a hugely remote period when . . . consciousness was manifested, perhaps, in shapes and forms long since withdrawn before the tide of advancing humanity . . . forms of which poetry and legend alone have caught a flying memory and called them gods, monsters, mythical beings of all sorts and kinds. . . .”</Text>
        <Text style={[styles.text, { textAlign: 'right' }]}>—Algernon Blackwood.</Text>

        {/* :::::::EXAMPLE_HEADER_CONTENT_AREA - END -------------------------*/}
      </ExpandableHeader>

      <StatusBar style='inverted' />
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
