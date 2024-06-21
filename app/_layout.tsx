import "@/global.css";
import "expo-dev-client";

import { ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";
import * as React from "react";

import { SafeAreaProvider } from "react-native-safe-area-context";
import { useEffect } from "react";
import { registerBackgroundFetchAsync } from "./background-fetch";
import { getRegisteredTasksAsync } from "expo-task-manager";
import { StatusBar } from "expo-status-bar";

import { useColorScheme, useInitialAndroidBarSync } from "@/lib/useColorScheme";
import { NAV_THEME } from "@/theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import deepEqual from "deep-equal";

export {
    // Catch any errors thrown by the Layout component.
    ErrorBoundary,
} from "expo-router";

export default function RootLayout() {
    useInitialAndroidBarSync();
    const { colorScheme, isDarkColorScheme } = useColorScheme();

    useEffect(() => {
        registerBackgroundFetchAsync().then(() => {
            getRegisteredTasksAsync().then((tasks) =>
                console.log("tasks", tasks)
            );
        });

        (async () => {
            const BASE_URL =
                "https://pub-5443694ea0c14312a955e32518bc2ff8.r2.dev";
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
            <ThemeProvider value={NAV_THEME[colorScheme]}>
                <Stack>
                    <Stack.Screen
                        name="index"
                        options={{
                            headerShown: false,
                            title: "Home",
                        }}
                    />
                    <Stack.Screen
                        name="guide/[slug]"
                        options={{ title: "Guide" }}
                    />
                    <Stack.Screen name="+not-found" />
                </Stack>
            </ThemeProvider>
        </SafeAreaProvider>
    );
}
