export const authRoutes = [
    {
        name: "Login",
        getComponent: () => require("../src/presentation/auth/Login/LoginScreen").default,
        options: {
            title: "Sign In",
            headerShown: false,
        },
    },
    {
        name: "SignUp",
        getComponent: () => require("../src/presentation/auth/SignUp/SignUpScreen").default,
        options: {
            title: "Sign In",
            headerShown: false,
        },
    },
    {
        name: "ChangePassword",
        getComponent: () => require("../src/presentation/auth/ChangePassword/ChangePasswordScreen").default,
        options: {
            title: "Change Password",
            headerShown: false,
        },
    },
    {
        name: "ForgotPassword",
        getComponent: () => require("../src/presentation/auth/ForgotPassword/ForgotPasswordScreen").default,
        options: {
            title: "Forgot Password",
            headerShown: false,
        },
    },
    {
        name: "EnterCode",
        getComponent: () => require("../src/presentation/auth/EnterCode/EnterCodeScreen").default,
        options: {
            title: "Enter Code",
            headerShown: false,
        },
    }
];
