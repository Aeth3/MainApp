import React from 'react';
import { ActivityIndicator, SafeAreaView, Text } from 'react-native';
import { useTheme } from "@react-navigation/native";
import { TabView, TabBar } from 'react-native-tab-view';
import LinearGradient from 'react-native-linear-gradient';
import Header from '../../layout/Header';
import { COLORS, SIZES, FONTS } from '../../constants/theme';
import Following from './Following';
import Followers from './Followers';

const ProfileFollow = () => {
    const {colors} = useTheme();
    const renderScene = ({ route }) => {
        switch (route.key) {
          case 'followers':
            return <Followers/>;
          case 'following':
            return <Following/>;
          default:
            return null;
        }
    };
    
    
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([
        { key: 'followers', title: '255 Followers' },
        { key: 'following', title: '83 Following' },
    ]);
    const renderTabBar = props => {
        return (
          <TabBar
            {...props}
            
            style={{
                backgroundColor:'transparent',
                elevation:0,
                shadowOpacity:0,
            }}
            tabStyle={{
                height:40,
                marginTop:5,
            }}
            indicatorStyle={{
                backgroundColor:COLORS.secondary,
            }}
            indicatorContainerStyle={{
                borderBottomWidth:1,
                borderColor:colors.borderColor
            }}
            pressColor={"transparent"}
            renderLabel={({ focused, route }) => {
              return (
                <Text
                    style={{
                        ...FONTS.fontLg,
                        fontSize:15,
                        top:-6,
                        color: focused ? colors.title : colors.text
                    }}
                >
                  {route.title}
                </Text>
              );
            }}
          />
        );
    };

    const  renderLazyPlaceholder = ({ route }) => (
        <ActivityIndicator color={COLORS.primary}/>
    );


    return (
        <SafeAreaView style={{flex:1}}>
            <LinearGradient
                style={{flex:1}}
                colors={colors.bgGradient}
            >
                <Header leftIcon={'back'} title="Javi Daniel Jr." />

                <TabView
                    lazy
                    renderLazyPlaceholder={renderLazyPlaceholder}
                    navigationState={{ index, routes }}
                    renderScene={renderScene}
                    onIndexChange={setIndex}
                    //swipeEnabled={false}
                    initialLayout={{ width: SIZES.width , height:0}}
                    renderTabBar={renderTabBar}
                />

            </LinearGradient>
        </SafeAreaView>
    );
};


export default ProfileFollow;