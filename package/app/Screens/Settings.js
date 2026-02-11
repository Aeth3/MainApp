import React, { useRef, useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, Share } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import { useTheme } from '@react-navigation/native';
import RBSheet from 'react-native-raw-bottom-sheet';
import { COLORS, FONTS, IMAGES, SIZES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import themeContext from '../constants/themeContext';
import ListStyle2 from '../components/list/ListStyle2';

const Settings = () => {

    const {colors} = useTheme();
    const RBSheetLanguage = useRef();

    const {setDarkTheme,setLightTheme} = React.useContext(themeContext);

    const [isDark , setIsDark] = useState();

    const onShare = async () => {
        try {
          const result = await Share.share({
                message:
                'Multipurpose react native application.\nDownload : https://play.google.com/store/apps/details?id=com.AppZilla \n Best application for every developer.',
          });
          if (result.action === Share.sharedAction) {
            if (result.activityType) {
              // shared with activity type of result.activityType
            } else {
              // shared
            }
          } else if (result.action === Share.dismissedAction) {
            // dismissed
          }
        } catch (error) {
          alert(error.message);
        }
    };

    const languagetData = [
        {
            flag : IMAGES.india,
            name : "Indian",
        },
        {
            flag : IMAGES.UnitedStates,
            name : "English",
        },
        {
            flag : IMAGES.german,
            name : "German",
        },
        {
            flag : IMAGES.italian,
            name : "Italian",
        },
        {
            flag : IMAGES.spanish,
            name : "Spanish",
        },
    ]

    const handleTheme = () => {
        setIsDark(!isDark);
        if(isDark){
            setLightTheme();
        }else{
            setDarkTheme();
        }
    }

    return (
        <>

            <RBSheet
                ref={RBSheetLanguage}
                closeOnDragDown={true}
                height={400}
                openDuration={300}
                customStyles={{
                    wrapper: {
                        backgroundColor: 'rgba(0,0,0,.3)',
                    },
                    container:{
                        backgroundColor:colors.card,
                        borderTopLeftRadius:15,
                        borderTopRightRadius:15,
                    },
                }}
            >
                <View style={{alignItems:'center',borderBottomWidth:1,borderColor:colors.borderColor,paddingBottom:8,paddingTop:4}}>
                    <Text style={{...FONTS.h5,color:colors.title}}>Language</Text>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom:20,paddingHorizontal:15}}>
                    {languagetData.map((data,index) => (
                        <TouchableOpacity
                            onPress={() => RBSheetLanguage.current.close()}
                            key={index}
                            style={{
                                paddingVertical:15,
                                borderBottomWidth:1,
                                borderColor:colors.borderColor,
                                flexDirection:'row',
                                alignItems:'center',
                            }}
                        >
                            <Image
                                style={{
                                    height:20,
                                    width:25,
                                    marginRight:12,
                                }}
                                source={data.flag}
                            />
                            <Text style={{...FONTS.fontLg,color:colors.title,flex:1}}>{data.name}</Text>
                            <FeatherIcon name="chevron-right" color={colors.text} size={24}/>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            </RBSheet>

            <SafeAreaView style={{flex:1,backgroundColor:colors.themeBg}}>
                <ScrollView contentContainerStyle={{flexGrow:1}}>
                    <View
                        style={{
                            backgroundColor:COLORS.themePrimary,
                            alignItems:'center',
                            paddingBottom:30,
                            borderBottomLeftRadius:18,
                            borderBottomRightRadius:18,
                        }}
                    >
                        <Image
                            source={IMAGES.appIcon}
                            style={{
                                height:50,
                                resizeMode:'contain',
                                width:60,
                                marginBottom:18,
                                marginTop:25,
                            }}
                        />
                        <Text style={{...FONTS.h2,color:COLORS.white,lineHeight:34,marginBottom:4}}>Meet AppZilla</Text>
                        <Text style={{...FONTS.font,fontSize:15,color:"#BCCFFF"}}>Multipurpose Mobile Application </Text>
                        <Image 
                            style={{
                                position:'absolute',
                                height:'100%',
                                width:'100%',
                                resizeMode:'cover',
                                zIndex:-1,
                            }}
                            source={IMAGES.bgPattern}
                        />
                    </View>
                    <View style={{...GlobalStyleSheet.container,flex:1}}>
                        <View style={[styles.card,{
                            backgroundColor: colors.cardBg,
                        }]}>
                            <ListStyle2
                                onPress={() => handleTheme()}
                                icon={<FeatherIcon color={"#ff4db8"} size={18} name={isDark ? 'sun' : 'moon'} />}
                                title={isDark ? "Light mode" : "Dark mode"}
                                desc="Just for you"
                            />
                            <ListStyle2
                                onPress={() => onShare()}
                                icon={<SimpleLineIcons color={"#4a8be0"} size={20} name='share' />}
                                title="App share"
                                desc="Just for you"
                            />
                            <ListStyle2
                                onPress={() => RBSheetLanguage.current.open()}
                                icon={<SimpleLineIcons color={"#ff586e"} size={18} name='globe' />}
                                title="Language"
                                desc="Just for you"
                            />
                        </View>
                    </View>
                    <View
                        style={{
                            backgroundColor:"#00127A",
                            paddingHorizontal:30,
                            paddingBottom:110,
                            paddingTop:40,
                            borderTopLeftRadius:18,
                            borderTopRightRadius:18,
                            alignItems:'center',
                        }}
                    >
                        <Image
                            style={{
                                height:42,
                                width:172,
                                resizeMode:'contain',
                                marginBottom:12,
                            }}
                            source={IMAGES.logoWhite}
                        />
                        <Text style={{...FONTS.font,color:"#A1B0FF",textAlign:'center'}}>Built to match the design trends and give your page the awesome facelift it deserves.</Text>
                        <View
                            style={{
                                flexDirection:'row',
                                marginTop:22,
                            }}
                        >
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome size={18} color={COLORS.white} name="facebook"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome size={18} color={COLORS.white} name="twitter"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome size={18} color={COLORS.white} name="youtube-play"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome size={18} color={COLORS.white} name="linkedin-square"/>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.socialIcon}>
                                <FontAwesome size={18} color={COLORS.white} name="instagram"/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

const styles = StyleSheet.create({
    socialIcon : {
        height:45,
        width:45,
        backgroundColor:'rgba(255,255,255,.1)',
        alignItems:'center',
        justifyContent:'center',
        borderRadius:8,
        marginHorizontal:4,
    },
    card : {
        padding:15,
        borderRadius:SIZES.radius,
        marginBottom:15,
        shadowColor: "rgba(0,0,0,.6)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.30,
        shadowRadius: 4.65,

        elevation: 8,
    },
})

export default Settings;