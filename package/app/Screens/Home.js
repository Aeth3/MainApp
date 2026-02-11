import React from 'react';
import { SafeAreaView, Text, View, Image, ScrollView, StyleSheet, FlatList, ImageBackground, TouchableOpacity, Linking } from 'react-native';
import { useTheme } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { COLORS, FONTS, IMAGES } from '../constants/theme';
import { GlobalStyleSheet } from '../constants/StyleSheet';
import PackageCard from '../components/PackageCard';
import ReviewCard from '../components/ReviewCard';

const Home = () => {
    
    const theme = useTheme();
    const {colors} = theme;

    const appComponents = ["Accordion", "Action Sheets","Action Modals","Buttons","Charts","Chips","Cards","Column","Collapse","Dividers","File Upload","Header","Footer","Input","List","Pagination","Pricing","Snackbars","Social","Tabs","Table","Toggle"];

    const PackagesData = [
        {
            id : "1",
            image : theme.dark ? IMAGES.demoDark1 : IMAGES.demo1,
            navigate : "SocialNetworkPages",
            title : "Social Network App",
        },
        {
            id : "4",
            image : theme.dark ? IMAGES.demoDark4 : IMAGES.demo4,
            navigate : "FoodPage",
            title : "Restaurant App",
        },
        {
            id : "6",
            image : theme.dark ? IMAGES.demoDark6 : IMAGES.demo6,
            navigate : "DatingPage",
            title : "Online Dating App",
        },
        {
            id : "7",
            image : theme.dark ? IMAGES.demoDark7 : IMAGES.demo7,
            navigate : "ClassifiedPage",
            title : "Classified App",
        },
        {
            id : "8",
            image : theme.dark ? IMAGES.demoDark8 : IMAGES.demo8,
            navigate : "LinkdinPage",
            title : "Linkdin Job App",
        },
        {
            id : "9",
            image : theme.dark ? IMAGES.demoDark9 : IMAGES.demo9,
            navigate : "YoutubePage",
            title : "Youtube Video App",
        },
        {
            id : "10",
            image : theme.dark ? IMAGES.demoDark10 : IMAGES.demo10,
            navigate : "TaskManagerPage",
            title : "Task Manager App",
        },
        {
            id : "2",
            image : theme.dark ? IMAGES.demoDark2 : IMAGES.demo2,
            navigate : "News&Blog",
            title : "News & Blog App",
        },
        {
            id : "3",
            image : theme.dark ? IMAGES.demoDark3 : IMAGES.demo3,
            navigate : "EduacationPage",
            title : "Education App",
        },
        {
            id : "5",
            image : theme.dark ? IMAGES.demoDark5 : IMAGES.demo5,
            navigate : "GroceryPage",
            title : "Grocery & Store App",
        },
    ]

    const ReviewData = [
        {
            id : "1",
            image : IMAGES.profile1,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
        {
            id : "2",
            image : IMAGES.youtubeProfile2,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
        {
            id : "3",
            image : IMAGES.youtubeProfile3,
            name : "Wichard Smith",
            desc : "Clean Design, Clean Code, Simple architecture!Thanks!",
        },
    ]

    const renderPackages = ({item}) => {
        return(
            <PackageCard
                image={item.image}
                title={item.title}
                navigate={item.navigate}
                type={item.type}
            />
        )
    }

    const renderReviewCard = ({item}) => {
        return(
            <ReviewCard
                image={item.image}
                name={item.name}
                desc={item.desc}
            />
        )
    }


    return (
        <>
            <SafeAreaView style={{flex:1,backgroundColor:colors.themeBg}}>
                <ScrollView>
                    <View
                        style={{
                            backgroundColor:COLORS.themePrimary,
                            alignItems:'center',
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
                            source={IMAGES.applications}
                            style={{
                                width:'100%',
                                height:180,
                                marginTop:-20,
                                resizeMode:'contain',
                            }}
                        />
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
                    
                    <View style={{marginTop:-35}}>
                        <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                            <View  style={{alignItems:'center'}}>
                                <View style={{...GlobalStyleSheet.row,maxWidth:450}}>
                                    <View style={GlobalStyleSheet.col50}>
                                        <View
                                            style={{
                                                backgroundColor:colors.card,
                                                borderRadius:8,
                                                height:50,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                paddingHorizontal:15,
                                                ...GlobalStyleSheet.shadow,
                                            }}
                                        >
                                            <Text style={{...FONTS.h3,color:COLORS.themeSecondary,marginRight:4,top:2}}>10+</Text>
                                            <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>Pre Build App</Text>
                                        </View>
                                    </View>
                                    <View style={GlobalStyleSheet.col50}>
                                        <View
                                            style={{
                                                backgroundColor:colors.card,
                                                borderRadius:8,
                                                height:50,
                                                flexDirection:'row',
                                                alignItems:'center',
                                                paddingHorizontal:15,
                                                ...GlobalStyleSheet.shadow,
                                            }}
                                        >
                                            <Image
                                                style={{
                                                    height:28,
                                                    width:28,
                                                    marginRight:8,
                                                }}
                                                source={IMAGES.react}
                                            />
                                            <Text style={{...FONTS.font,...FONTS.fontBold,fontSize:15,color:colors.title}}>React Native</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                            <View
                                style={{
                                    flexDirection:'row',
                                    alignItems:'center',
                                    marginTop:20,
                                }}
                            >
                                <Image
                                    style={{
                                        height:24,
                                        width:24,
                                        marginRight:6,
                                        marginBottom:3,
                                    }}
                                    source={IMAGES.bag}
                                />
                                <Text style={{...FONTS.h5,color:theme.dark ? COLORS.white : COLORS.themePrimary}}>Packages</Text>
                            </View>

                        </View>
                        
                        <FlatList
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{paddingTop:12,paddingLeft:15,paddingBottom:20}}
                            data={PackagesData}
                            keyExtractor={(item) => item.id}
                            renderItem={renderPackages}
                        />

                        <View>
                            <View
                                style={{
                                    position:'absolute',
                                    height:"100%",
                                    width:"45%",
                                    backgroundColor:COLORS.themePrimary,
                                    borderRadius:25,
                                    borderBottomLeftRadius:0,
                                }}
                            />
                            <View style={[GlobalStyleSheet.container,{paddingBottom:0}]}>
                                <View
                                    style={{
                                        flexDirection:'row',
                                        alignItems:'center',
                                    }}
                                >
                                    <Image
                                        style={{
                                            height:24,
                                            width:24,
                                            marginBottom:3,
                                            marginRight:6,
                                        }}
                                        source={IMAGES.star3}
                                    />
                                    <Text style={{...FONTS.h5,color:COLORS.white,flex:1}}>Features</Text>
                                    <Text style={{...FONTS.h3,color:COLORS.themePrimary,marginRight:-20}}>50+ <Text style={{color:"#A4AEDF"}}>Elements</Text></Text>
                                </View>
                            </View>
                            <ScrollView
                                horizontal
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{
                                    paddingLeft:15,
                                    paddingTop:10,
                                    paddingBottom:25,
                                }}
                            >
                                {appComponents.map((data,index) => {
                                    return(
                                        <View
                                            key={index}
                                            style={{
                                                backgroundColor:theme.dark ? "rgba(255,255,255,.1)" : colors.card,
                                                borderRadius:8,
                                                height:45,
                                                marginRight:10,
                                                alignItems:'center',
                                                justifyContent:'center',
                                                paddingHorizontal:15,
                                                ...GlobalStyleSheet.shadow,
                                            }}
                                        >
                                            <Text style={{...FONTS.font,...FONTS.fontBold,color:colors.title,bottom:1,}}>{data}</Text>
                                        </View>
                                    )
                                })}
                            </ScrollView>
                        </View>

                        <View style={[GlobalStyleSheet.container,{marginTop:10}]}>
                            <Text style={{...FONTS.h4,color:colors.title,textAlign:'center'}}>Ready in <Text style={{color:COLORS.themeSecondary}}>3</Text> Steps</Text>
                        </View>
                        <View
                            style={{
                                flexDirection:'row',
                                alignItems:'center',
                                marginBottom:40,
                            }}
                        >
                            <View
                                style={{
                                    backgroundColor:theme.dark ? colors.cardBg : colors.card,
                                    borderRadius:12,
                                    borderTopLeftRadius:0,
                                    borderBottomLeftRadius:0,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:20,
                                    paddingBottom:15,
                                    flex:1,
                                    marginRight:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        marginBottom:10,
                                    }}
                                    source={IMAGES.search2}
                                />
                                <Text style={{...FONTS.h6,color:colors.title,textAlign:'center'}}>Find Your Style</Text>
                            </View>
                            <View
                                style={{
                                    flex:1,
                                    backgroundColor:COLORS.themePrimary,
                                    borderRadius:12,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:30,
                                    paddingBottom:25,
                                }}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        marginBottom:10,
                                    }}
                                    source={IMAGES.plus}
                                />
                                <Text style={{...FONTS.h6,color:COLORS.white,textAlign:'center'}}>Add Your Elements</Text>
                            </View>
                            <View
                                style={{
                                    flex:1,
                                    marginLeft:15,
                                    backgroundColor:theme.dark ? colors.cardBg : colors.card,
                                    borderRadius:12,
                                    borderTopRightRadius:0,
                                    borderBottomRightRadius:0,
                                    alignItems:'center',
                                    paddingHorizontal:15,
                                    paddingTop:20,
                                    paddingBottom:15,
                                    ...GlobalStyleSheet.shadow,
                                }}
                            >
                                <Image
                                    style={{
                                        height:35,
                                        width:35,
                                        marginBottom:10,
                                    }}
                                    source={IMAGES.grid}
                                />
                                <Text style={{...FONTS.h6,color:colors.title,textAlign:'center'}}>Publish Your App</Text>
                            </View>
                        </View>

                        <ImageBackground
                            source={IMAGES.clients}
                            style={{
                                borderTopLeftRadius:20,
                                borderTopRightRadius:20,
                                overflow:'hidden',
                            }}
                        >
                            <View
                                style={{
                                    position:'absolute',
                                    height:'100%',
                                    width:'100%',
                                    backgroundColor:COLORS.themePrimary,
                                    opacity:.9,
                                }}
                            />
                            <View style={{
                                paddingTop:25,
                                paddingBottom:60,
                            }}>
                                <View style={{paddingHorizontal:15,marginBottom:20}}>
                                    <View
                                        style={{
                                            flexDirection:'row',
                                            marginBottom:3,
                                        }}
                                    >
                                        <Image
                                            style={{
                                                height:24,
                                                width:24,
                                                marginRight:6,
                                                top:1,
                                            }}
                                            source={IMAGES.userIco}
                                        />
                                        <Text style={{...FONTS.h5,color:COLORS.white}}>Happy Customers</Text>
                                    </View>
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:'rgba(255,255,255,.8)'}}>Over 10.000 people use our products, and we're always happy to see the positiv impact our products have had! Thank you!</Text>
                                </View>
                                
                                <FlatList
                                    horizontal
                                    showsHorizontalScrollIndicator={false}
                                    contentContainerStyle={{paddingLeft:15}}
                                    data={ReviewData}
                                    keyExtractor={(item) => item.id}
                                    renderItem={renderReviewCard}
                                />

                            </View>
                        </ImageBackground>
                        
                        <View
                            style={{
                                backgroundColor:colors.themeBg,
                                borderTopLeftRadius:18,
                                borderTopRightRadius:18,
                                marginTop:-25,
                                paddingHorizontal:15,
                                paddingTop:25,
                            }}
                        >
                            <View
                                style={{
                                    paddingHorizontal:15,
                                    paddingVertical:20,
                                    backgroundColor:COLORS.themePrimary,
                                    borderRadius:18,
                                    alignItems:'center',
                                    marginBottom:-55,
                                    position:'relative',
                                    zIndex:1,
                                }}
                            >
                                <Text style={{...FONTS.h4,color:COLORS.white,textAlign:'center'}}>Purchase Today</Text>
                                <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.themeSecondary,textAlign:'center',marginBottom:8}}>Quality and Premium Features for You</Text>
                                <Text style={{...FONTS.font,color:"#CCD4FF",textAlign:'center'}}>Fast, easy to use and filled with features. Give your site the Mobile Feeling it deserves.</Text>
                                <TouchableOpacity
                                    onPress={() => Linking.openURL('https://1.envato.market/DV5Geb')}
                                    style={{
                                        backgroundColor:COLORS.white,
                                        height:45,
                                        justifyContent:'center',
                                        paddingHorizontal:25,
                                        borderRadius:8,
                                        marginTop:15,
                                    }}
                                >
                                    <Text style={{...FONTS.font,...FONTS.fontBold,color:COLORS.themePrimary,top:-1}}>Buy now - <Text style={{color:COLORS.themeSecondary}}>$38</Text></Text>
                                </TouchableOpacity>
                            </View>
                            
                            <View
                                style={{
                                    backgroundColor:"#00127A",
                                    paddingHorizontal:30,
                                    marginHorizontal:-15,
                                    paddingBottom:110,
                                    paddingTop:90,
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
    }
})

export default Home;