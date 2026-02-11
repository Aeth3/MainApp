import React from 'react';
import { Image, SafeAreaView, ScrollView, View } from 'react-native';
import { useTheme } from '@react-navigation/native';
import CardStyle1 from '../components/card/CardStyle1';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import { COLORS, IMAGES } from '../constants/theme';
import Header from '../layout/Header';

const Pages = (props) => {

    const { colors } = useTheme();

    const PagesData = [
        {
            color :  COLORS.primary6,
            icon  : IMAGES.suitcaseIco,
            title : "LinkdIn Pack",
            desc  : "Pages for Jobs & network",
            navigate : "LinkdinPage",
        },  
        {
            color :  COLORS.primary7,
            icon  : IMAGES.play,
            title : "Youtube Pack",
            desc  : "Pages for videos",
            navigate : "YoutubePage",
        },  
        {
            color :  COLORS.primary6,
            icon  : IMAGES.blog,
            title : "Task Manager",
            desc  : "Pages for Task Manager pack",
            navigate : "TaskManagerPage",
        },  
        {
            color :  COLORS.primary,
            icon  : IMAGES.fairtrade,
            title : "Social Network",
            desc  : "Pages for Social & network",
            navigate : "SocialNetworkPages",
        },  
        {
            color : "#4a89dc",
            icon  : IMAGES.blog,
            title : "News & Blog",
            desc  : "Pages for blog & news",
            navigate : "News&Blog",
        },  
        {
            color : "#656d77",
            icon  : IMAGES.book,
            title : "Education",
            desc  : "Learning , Course Pages for Education",
            navigate : "EduacationPage",
        },
        {
            color : "#e99331",
            icon  : IMAGES.restaurant,
            title : "Food Pack",
            desc  : "Pages for Food & Restaurant",
            navigate : "FoodPage",
        },
        {
            color : "#36c1ab",
            icon  : IMAGES.grocery,
            title : "Grocery",
            desc  : "Grocery store pages",
            navigate : "GroceryPage",
        },
        {
            color : "#f85c6f",
            icon  : IMAGES.heart,
            title : "Dating App",
            desc  : "Dating app pages",
            navigate : "DatingPage",
        },
        {
            color : "#7c58dd",
            icon  : IMAGES.scheme,
            title : "Classified App",
            desc  : "Pages for Classified app",
            navigate : "ClassifiedPage",
        },
    ]

    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.themeBg}}>
                
                    <Header title={'Applications'} bgWhite leftIcon={'back'}/>

                    <ScrollView contentContainerStyle={{paddingBottom:60}}>
                        <View style={GlobalStyleSheet.container}>
                            {PagesData.map((data,index) => {
                                return(
                                    <View key={index} style={{marginBottom:12}}>
                                        <CardStyle1
                                            onPress={() => props.navigation.navigate(data.navigate)}
                                            iconColor={data.color}
                                            icon={
                                                <Image 
                                                    source={data.icon} 
                                                    style={{
                                                        height:30,
                                                        width:30,
                                                        resizeMode:'contain',
                                                        tintColor: data.color
                                                    }}/>
                                            }
                                            title={data.title}
                                            desc={data.desc}
                                        />
                                    </View>
                                )
                            })}
                        </View>
                    </ScrollView>

            </SafeAreaView>
        </>
    );
};


export default Pages;