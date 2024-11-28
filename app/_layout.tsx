import "~/global.css";
import "expo-dev-client";

import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Toaster } from "sonner-native";
import { useEffect } from "react";
import { registerBackgroundFetchAsync } from "../lib/background-fetch";
import { getRegisteredTasksAsync } from "expo-task-manager";
import { StatusBar } from "expo-status-bar";

import { useColorScheme, useInitialAndroidBarSync } from "~/lib/useColorScheme";
import { NAV_THEME } from "~/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deepEqual from "deep-equal";
import { PortalHost } from "@rn-primitives/portal";
import { KeyboardProvider } from "react-native-keyboard-controller";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
    useInitialAndroidBarSync();
    const { colorScheme, isDarkColorScheme } = useColorScheme();

    useEffect(() => {
        registerBackgroundFetchAsync();

        (async () => {
            const BASE_URL = "https://content.useguider.com";
            AsyncStorage.setItem("lastFetch", new Date().toISOString());
            const newIndex = await (
                await fetch(`${BASE_URL}/index.json`)
            ).json();
            const storedIndex = await AsyncStorage.getItem("guideIndex");

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
                            screenOptions={{
                                headerBackButtonDisplayMode: "minimal",
                            }}
                        >
                            <Stack.Screen
                                name="(tabs)"
                                options={{ headerShown: false }}
                            />
                            <Stack.Screen name="+not-found" />
                        </Stack>
                        <Toaster
                            theme={colorScheme}
                            position="bottom-center"
                            swipeToDismissDirection="left"
                            richColors={true}
                        />
                        <PortalHost />
                    </ThemeProvider>
                </KeyboardProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    );
}
