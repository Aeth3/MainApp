import React from 'react';
import { SafeAreaView, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { COLORS, ICONS, SIZES } from '../constants/theme';
import MediaContent from '../components/MediaContent';

const Media = (props) => {

    const {colors} = useTheme();

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.themeBg}}>
                <View style={{paddingHorizontal:15,paddingTop:15,marginBottom:15}}>
                    <View>
                        <TouchableOpacity
                            style={{
                                height:50,
                                width:50,
                                position:'absolute',
                                zIndex:1,
                                right:0,
                                top:-1,
                                alignItems:'center',
                                justifyContent:'center',
                            }}
                        >
                            <SvgXml xml={ICONS.searchLight}/>
                        </TouchableOpacity>
                        <TextInput 
                            style={{
                                height:50,
                                backgroundColor: colors.card,
                                borderWidth:1,
                                borderColor: colors.borderColor,
                                borderRadius:SIZES.radius,
                                color:colors.title,
                                paddingLeft:15,
                            }}
                            placeholder="Search.."
                            placeholderTextColor={colors.text}
                        />
                    </View>
                </View>
                <ScrollView contentContainerStyle={{paddingBottom:80}}>
                    
                    <MediaContent/>
                    
                </ScrollView>
            </SafeAreaView>
        </>
    );
};

export default Media;