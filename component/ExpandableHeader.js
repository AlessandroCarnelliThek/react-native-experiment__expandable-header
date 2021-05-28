/*MMmysssshNMMMN
NMy+:dMMMMo/omMN
N++. .dMMo  //dN     .oyyyo .oyyyo` +yo  +yo :yyyy+  +yyys- .yy: /y` yyyyy :yy. os yyyyyy.
d/-   ++o-   o:N    `Nm.  -`Nm` .Nm sMms+mMh +M/`hM-yM:  yM:-MdMooM.`Mm++/ oMhN:hN   mM    
d/MMMMd:/MMMMN:N    `Nm.  -`Nm` .Nm sM-dd.Mh +Mhso- yM:  yM:-M+-mMM.`Md--. oM-/NNN   mM    
N+yMMm.  oMMN/dN     .oyyyo .oyyyo` /y`  `yo :y-     +yyys- .y: `sy` yyyyy :y. -ys   sy
NMh+y/-..:ssomMN
NMMMmysssshNMMMN

__________________________________________________________________________________________

    EXPANDABLE HEADER COMPONENT


    #_FILTER: when it is active it stands between the application and the header and 
              blocks the interactions with the page below.
    #_HEADER: is the fixed part of the header where the  ' TITLE ' is shown.
    #_HEADER_SHEET: is the moving part of the header where the ' CONTENT ' is shown.
    #_HEADER_BTN: it is used to toggle the state of 'isSheetOpen'.
    

    each time header_btn is pressed toggle the status of isSheetOpen
        if isSheetOpen is true the headerSheetOPEN animation will be loaded: 
            -there will be a transition of HEADER_SHEET and HEADER_BTN down 
             equal to header_content_height and the FILTER is activated,
            -then the content will be made visible.
        else if it is false the headerSheetCLOSE animation will be loaded:
            -the content will be made invisible,
            -then there will be a transition of HEADER_SHEET and HEADER_BTN upwards
             to their respective origins and the filter is deactivated.


________________________________________________________________________________________*/


import React, { useEffect, useState, useRef } from 'react';
import {
    StyleSheet,
    Dimensions,
    Text,
    View,
    Pressable,
    Animated,
} from 'react-native';

import costants from '../config/costants'

const { COLOR_BG, COLOR_FILTER, COLOR_HEADER, COLOR_ITEM, HEADER_VERTICAL_SPACER, SHEET_HORIZONTAL_SPACER } = costants
const { width, height } = Dimensions.get('window')

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function ExpandableHeader({ children, title }) {

    const [header_content_height, setHeader_content_height] = useState(0)
    const [isSheetOpen, setIsSheetOpen] = useState(false)

    const header_content_opacity = useRef(new Animated.Value(0)).current
    const header_sheet_translation = useRef(new Animated.Value(0)).current
    const filter_opacity = useRef(new Animated.Value(0)).current

    const animatedStyle = {
        contentOpacity: {
            opacity: header_content_opacity
        },
        filterOpacity: {
            opacity: filter_opacity
        },
        translation: {
            transform: [{
                translateY: header_sheet_translation
            }],
        },
    }
    const headerSheetOPEN = () => {
        Animated.sequence([
            Animated.parallel([
                Animated.timing(header_sheet_translation, {
                    toValue: header_content_height,
                    timing: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(header_sheet_translation, {
                    toValue: header_content_height,
                    timing: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(filter_opacity, {
                    toValue: .8,
                    timing: 1000,
                    useNativeDriver: true,
                })
            ]),
            Animated.timing(header_content_opacity, {
                toValue: .7,
                timing: 1000,
                useNativeDriver: true,
            }),
        ]).start()
    }

    const headerSheetCLOSE = () => {
        Animated.sequence([
            Animated.timing(header_content_opacity, {
                toValue: isSheetOpen ? .7 : 0,
                timing: 1000,
                useNativeDriver: true,
            }),
            Animated.parallel([
                Animated.timing(header_sheet_translation, {
                    toValue: 0,
                    timing: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(header_sheet_translation, {
                    toValue: 0,
                    timing: 1000,
                    useNativeDriver: true,
                }),
                Animated.timing(filter_opacity, {
                    toValue: 0,
                    timing: 1000,
                    useNativeDriver: true,
                })
            ]),
        ]).start()
    }

    const onLayoutGetContentHeight = (event) => {
        setHeader_content_height(event.nativeEvent.layout.height)
    }

    useEffect(() => {
        if (isSheetOpen)
            headerSheetOPEN()
        else
            headerSheetCLOSE()
    }, [isSheetOpen])

    return (
        <>
            {/* :::::::FILTER ------------------------------------------*/}
            <Animated.View style={[styles.filter, animatedStyle.filterOpacity]} pointerEvents={isSheetOpen ? 'auto' : 'none'} />
            {/*---------------------------------------------------------*/}

            {/* :::::::HEADER - START ----------------------------------*/}
            <View style={styles.header}>

                {/* :::::::HEADER_SHEET - START ----------------------------*/}
                <Animated.View style={[styles.header__sheet, animatedStyle.translation]} onLayout={(e) => onLayoutGetContentHeight(e)}>
                    <Animated.View style={[styles.content__container, animatedStyle.contentOpacity]} >

                        {children}

                    </Animated.View>
                </Animated.View>
                {/* :::::::HEADER_SHEET - END ------------------------------*/}

                <Text style={styles.title}>{title}</Text>

            </View>
            {/* :::::::HEADER - END ------------------------------------*/}


            {/* :::::::HEADER_BTN ------------------------------*/}
            <AnimatedPressable
                onPress={() => setIsSheetOpen((prev) => !prev)}
                style={[styles.btn, animatedStyle.translation]} >
                <View style={styles.btn_mask} />
                <View style={[styles.btn_point, { backgroundColor: isSheetOpen ? COLOR_ITEM : COLOR_BG, }]} />
            </AnimatedPressable>
            {/*--------------------------------------------------*/}
        </>
    )
}

const styles = StyleSheet.create({
    filter: {
        backgroundColor: COLOR_FILTER,
        width: width,
        height: '100%',
        opacity: .8,
        position: 'absolute',

    },
    header: {
        backgroundColor: COLOR_HEADER,
        width: width,
        paddingVertical: HEADER_VERTICAL_SPACER,
        position: 'absolute',
        top: 0,
        justifyContent: 'center',
        alignItems: 'center',

    },
    header__sheet: {
        backgroundColor: COLOR_HEADER,
        width: width,
        paddingHorizontal: SHEET_HORIZONTAL_SPACER,
        paddingBottom: HEADER_VERTICAL_SPACER * 1.5,
        position: 'absolute',
        bottom: 0,
        borderBottomColor: COLOR_BG,
        borderBottomWidth: 4,
        justifyContent: 'center',
        alignItems: 'center',

    },
    content__container: {
        // backgroundColor: '#f00',

    },
    title: {
        color: COLOR_BG,
        fontSize: 40,
        fontWeight: '100',

    },
    btn: {
        backgroundColor: COLOR_HEADER,
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 100,
        borderWidth: 4,
        borderColor: COLOR_BG,
        justifyContent: 'center',
        alignItems: 'center',

    },
    btn_mask: {
        backgroundColor: COLOR_HEADER,
        width: 100,
        height: 30.4,
        position: 'absolute',
        top: -5,

    },
    btn_point: {
        width: 20,
        height: 20,
        position: 'absolute',
        borderRadius: 50

    }
})
