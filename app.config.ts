import { ExpoConfig } from "expo/config";
import { PluginConfigType } from "expo-build-properties/src/pluginConfig";

const config = (): ExpoConfig => ({
    name: "Guider",
    slug: "guider",
    version: "0.0.1",
    description: "Offline Access to Emergency Guides",
    owner: "codewithshreyans",
    githubUrl: "https://github.com/CodeWithShreyans/guider",
    orientation: "portrait",
    icon: "./assets/images/icons/tinted.png",
    scheme: "guider",
    userInterfaceStyle: "automatic",
    platforms: ["ios", "android"],
    splash: {
        image: "./assets/images/icons/tinted.png",
        backgroundColor: "#000000",
    },
    ios: {
        supportsTablet: true,
        bundleIdentifier: "sh.shreyans.guider",
        entitlements: {
            "aps-environment": "development",
        },
        icon: {
            light: "./assets/images/icons/light.png",
            dark: "./assets/images/icons/dark.png",
            tinted: "./assets/images/icons/tinted.png",
        },
        config: {
            usesNonExemptEncryption: false,
        },
    },
    android: {
        package: "sh.shreyans.guider",
    },
    plugins: [
        "expo-router",
        "react-native-edge-to-edge",
        [
            "expo-build-properties",
            {
                ios: {
                    newArchEnabled: true,
                },
                android: {
                    newArchEnabled: true,
                    minSdkVersion: 28,
                },
            } as PluginConfigType,
        ],
    ],
    experiments: {
        typedRoutes: true,
        turboModules: true,
        reactCompiler: true,
    },
    extra: {
        router: {
            origin: false,
        },
        eas: {
            projectId: "73754ac9-a30d-48ae-9127-c179690b1fdf",
        },
    },
    runtimeVersion: {
        policy: "appVersion",
    },
    updates: {
        url: "https://u.expo.dev/73754ac9-a30d-48ae-9127-c179690b1fdf",
    },
});

export default config;
