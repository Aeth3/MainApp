import React from 'react';
import { 
    SafeAreaView,
    ScrollView,
    Text,
    TouchableOpacity
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { FONTS, ICONS } from '../../constants/theme';
import Header from '../../layout/Header';

const SecurityData = [
    {
        title : 'Login activity',
        navigate : 'LoginActivity',
        icon : ICONS.location2,
    },
    {
        title : 'Saved login info',
        navigate : 'SavedLoginInfo',
        icon : ICONS.logininfo,
    },
    {
        title : 'Two factor authentication',
        navigate : 'TwoFactorAuth',
        icon : ICONS.usershield,
    },
    
]

const Security = (props) => {
    const {colors} = useTheme();
    return (
        <SafeAreaView style={{flex:1,backgroundColor:colors.background}}>
            <Header title={'Security'} leftIcon={'back'}/>
            <ScrollView contentContainerStyle={{paddingVertical:15}}>
                {SecurityData.map((data,index) => {
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
                            <SvgXml
                                style={{marginRight:10}}
                                height={20}
                                width={20}
                                fill={colors.title}
                                xml={data.icon}
                            />
                            
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


export default Security;