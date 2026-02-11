import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useTheme } from "@react-navigation/native";
import { COLORS, FONTS } from '../constants/theme';

const MsgComponent = (props) => {
    const {colors} = useTheme();
    return (
        <Pressable style={{marginBottom:10}}>
            <View
                style={[styles.messageBox,{
                    backgroundColor:props.sender ? COLORS.secondary : colors.card,
                    alignSelf:props.sender ? 'flex-end' : 'flex-start',
                    borderRadius:10,
                },props.sender ? {
                    borderBottomRightRadius:0,
                }:{
                    borderTopLeftRadius:0,
                }]}
            >
                <Text style={{...FONTS.font,top:-1,color:props.sender ? COLORS.white : colors.title}}>{props.item.message}</Text>
            </View>
            <Text style={{...FONTS.fontXs,fontSize:10,marginHorizontal:12,color:'#949497',marginTop:2,alignSelf:props.sender ? 'flex-end' : 'flex-start'}}>{props.item.sendTime}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({

    messageBox:{
        paddingHorizontal:15,
        paddingVertical:10,
        marginHorizontal:12,
    }
  
})

export default MsgComponent;