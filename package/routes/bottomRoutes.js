export const bottomRoutes = [
    {
        name: "Dashboard",
        getComponent: () => require("@features/auth/Home/Entry").default,
        options: {
            title: "Dashboard",
            headerShown: false,
        },
    },
    {
        name: "Housekeeping",
        getComponent: () => require("../components/screens/HousekeepingScreen").default,
        options: {
            title: "Housekeeping",
            headerShown: false,
        },
    },
    {
        name: "Front Office",
        getComponent: () => require("../components/screens/FrontOfficeScreen").default,
        options: {
            title: "Front Office",
            headerShown: false,
        },
    },
    {
        name: "Messaging",
        getComponent: () => require("../components/screens/MessagingScreen").default,
        options: {
            title: "Messaging",
            headerShown: false,
        },
    },
];