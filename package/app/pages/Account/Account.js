import React from 'react';
import { SafeAreaView, ScrollView, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { FONTS, ICONS } from '../../constants/theme';
import Header from '../../layout/Header';

const AccountData = [
    {
        title : 'Personal information',
        navigate : 'PersonalInformation',
    },
    {
        title : 'Language',
        navigate : 'Language',
    },
    {
        title : 'Contacts syncing',
        navigate : 'ContactsSyncing',
    },
    
]

const Account = (props) => {
    const {colors} = useTheme();
    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <Header title={'Account'} leftIcon={'back'}/>
            <ScrollView contentContainerStyle={{paddingVertical:15}}>
                {AccountData.map((data,index) => {
                    return(
                        <TouchableOpacity
                            onPress={()=> props.navigation.navigate(data.navigate)}
                            key={index}
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginHorizontal:15,
                                paddingVertical:12,
                                borderBottomWidth:1,
                                borderColor:colors.borderColor,
                            }}
                        >
                            <Text style={{...FONTS.font,fontSize:16,fontFamily:'Poppins-Medium',color:colors.title,flex:1}}>{data.title}</Text>
                            <SvgXml
                                stroke={colors.title}
                                xml={ICONS.right}
                            />
                        </TouchableOpacity>
                    )
                })}
            </ScrollView>
        </SafeAreaView>
    );
};

export default Account;