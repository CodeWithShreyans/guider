import "~/global.css";
import "expo-dev-client";

import { NavigationContainer, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toasts } from "@backpackapp-io/react-native-toast";
import { useEffect } from "react";
import { registerBackgroundFetchAsync } from "./background-fetch";
import { getRegisteredTasksAsync } from "expo-task-manager";
import { StatusBar } from "expo-status-bar";

import { useColorScheme, useInitialAndroidBarSync } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deepEqual from "deep-equal";
import { PortalHost } from "@rn-primitives/portal";
import { KeyboardProvider } from "react-native-keyboard-controller";
import {
    BottomTabBarHeightContext,
    useBottomTabBarHeight,
} from "@react-navigation/bottom-tabs";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
    useInitialAndroidBarSync();
    const { colorScheme, isDarkColorScheme } = useColorScheme();

    // const tabBarHeight = useBottomTabBarHeight();

    useEffect(() => {
        registerBackgroundFetchAsync().then(() => {
            getRegisteredTasksAsync().then((tasks) =>
                console.log("tasks", tasks)
            );
        });

        (async () => {
            const BASE_URL = "https://guider-content.shreyans.sh";
            AsyncStorage.setItem("lastFetch", new Date().toISOString());
            const newIndex = await (
                await fetch(`${BASE_URL}/index.json`)
            ).json();
            const storedIndex = await AsyncStorage.getItem("guideIndex");

            console.log(deepEqual(newIndex, JSON.parse(storedIndex as string)));
            if (storedIndex && deepEqual(newIndex, JSON.parse(storedIndex))) {
                return;
            }

            await AsyncStorage.setItem("guideIndex", JSON.stringify(newIndex));

            for (const i of newIndex) {
                const guide = await (
                    await fetch(`${BASE_URL}/${i.slug}.json`)
                ).json();
                await AsyncStorage.setItem(guide.slug, JSON.stringify(guide));
            }
        })();
    }, []);

    return (
        <SafeAreaProvider>
            <StatusBar
                key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
                style={isDarkColorScheme ? "light" : "dark"}
            />
            <GestureHandlerRootView>
                <KeyboardProvider statusBarTranslucent navigationBarTranslucent>
                    <ThemeProvider value={NAV_THEME[colorScheme]}>
                        <Stack
                            screenOptions={{ headerBackTitleVisible: false }}
                        >
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                        <Toasts
                            extraInsets={{
                                bottom: 80,
                            }}
                            overrideDarkMode={!isDarkColorScheme}
                        />
                        <PortalHost />
                    </ThemeProvider>
                </KeyboardProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
