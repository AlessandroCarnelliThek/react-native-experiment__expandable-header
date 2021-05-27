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

    const animatedSyle = {

        contentOpacity: {
            opacity: header_content_opacity
        },
        translation: {
            transform: [{
                translateY: header_sheet_translation
            }],
        },
        filterOpacity: {
            opacity: filter_opacity
        },
    }
    const headerSheetFADE_IN = () => {

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
    const headerSheetFADE_OUT = () => {

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
            headerSheetFADE_IN()
        else
            headerSheetFADE_OUT()
    }, [isSheetOpen])

    return (

        <>
            <Animated.View style={[styles.filter, animatedSyle.filterOpacity]} pointerEvents={isSheetOpen ? 'auto' : 'none'} />

            <View style={styles.header}>

                <Animated.View style={[styles.header__sheet, animatedSyle.translation]} onLayout={(e) => onLayoutGetContentHeight(e)}>
                    <Animated.View style={[styles.content__container, animatedSyle.contentOpacity]} >
                        {/* :::::::HEADER_CONTENT - START -----------------------*/}

                        {children}

                        {/* :::::::HEADER_CONTENT - END -------------------------*/}
                    </Animated.View>
                </Animated.View>

                <Text style={styles.title}>{title}</Text>

            </View>
            <AnimatedPressable
                onPress={() => setIsSheetOpen((prev) => !prev)}
                style={[styles.btn, animatedSyle.translation]} >
                <View style={styles.btn_mask} />
                <View style={[styles.btn_point, { backgroundColor: isSheetOpen ? COLOR_ITEM : COLOR_BG, }]} />
            </AnimatedPressable>
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

        // borderTopColor: '#ccc',
        // borderTopWidth: 4,

        borderBottomColor: COLOR_BG,
        borderBottomWidth: 4,

        justifyContent: 'center',
        alignItems: 'center'
    },
    content__container: {
        // backgroundColor: '#f00'
    },
    title: {
        color: COLOR_BG,
        fontSize: 40,
        fontWeight: '100'
    },
    btn: {
        width: 50,
        height: 50,
        borderRadius: 50,
        position: 'absolute',
        top: 100,
        backgroundColor: COLOR_HEADER,

        borderWidth: 4,
        borderColor: COLOR_BG,

        justifyContent: 'center',
        alignItems: 'center',
        // overflow: 'hidden',
    },
    btn_mask: {
        width: 100, height: 30.4, position: 'absolute', top: -5, backgroundColor: COLOR_HEADER
    },
    btn_point: {
        width: 20, height: 20, position: 'absolute', borderRadius: 50
    }
})
