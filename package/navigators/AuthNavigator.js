import { CardStyleInterpolators, createStackNavigator } from "@react-navigation/stack"
import { authRoutes } from "../routes/authRoutes"


const Stack = createStackNavigator()

export default function AuthNavigator() {
    return <Stack.Navigator
        detachInactiveScreens={true}
        screenOptions={{
            headerShown: false,
            cardStyle: { backgroundColor: "transparent" },
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        }}>
        {authRoutes.map(({ name, component, getComponent, options }) => {
            const screenConfig = getComponent
                ? { getComponent }
                : { component };

            return (
                <Stack.Screen
                    key={name}
                    name={name}
                    {...screenConfig}
                    options={options}
                />
            );
        })}
    </Stack.Navigator>
}
