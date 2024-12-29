import "~/global.css"
import "expo-dev-client"

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { ThemeProvider } from "@react-navigation/native"
import { PortalHost } from "@rn-primitives/portal"
import deepEqual from "deep-equal"
import { Stack } from "expo-router"
import { StatusBar } from "expo-status-bar"
import * as React from "react"
import { useEffect } from "react"
import { GestureHandlerRootView } from "react-native-gesture-handler"
import { KeyboardProvider } from "react-native-keyboard-controller"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { Toaster } from "sonner-native"
import { useColorScheme, useInitialAndroidBarSync } from "~/lib/useColorScheme"
import { NAV_THEME } from "~/theme"
import { registerBackgroundFetchAsync } from "../lib/background-fetch"

export { ErrorBoundary } from "expo-router"

export default function RootLayout() {
    useInitialAndroidBarSync()
    const { colorScheme, isDarkColorScheme } = useColorScheme()

    // const bottomSheetModalRef = useSheetRef();

    useEffect(() => {
        // AsyncStorage.getItem("firstLaunch").then((v) => {
        //     if (v == null) {
        //         bottomSheetModalRef.current?.present();
        //     }
        // });

        registerBackgroundFetchAsync()
        ;(async () => {
            const baseUrl = "https://content.useguider.com"
            AsyncStorage.setItem("lastFetch", new Date().toISOString())
            const newIndex = await (await fetch(`${baseUrl}/index.json`)).json()
            const storedIndex = await AsyncStorage.getItem("guideIndex")

            if (storedIndex && deepEqual(newIndex, JSON.parse(storedIndex))) {
                return
            }
            x
            await AsyncStorage.setItem("guideIndex", JSON.stringify(newIndex))

            for (const i of newIndex) {
                const guide = await (
                    await fetch(`${baseUrl}/${i.slug}.json`)
                ).json()
                await AsyncStorage.setItem(guide.slug, JSON.stringify(guide))
            }
        })()
    }, [])

    return (
        <SafeAreaProvider>
            <StatusBar
                key={`root-status-bar-${isDarkColorScheme ? "light" : "dark"}`}
                style={isDarkColorScheme ? "light" : "dark"}
            />
            <GestureHandlerRootView style={{ flex: 1 }}>
                <BottomSheetModalProvider>
                    <KeyboardProvider
                        statusBarTranslucent
                        navigationBarTranslucent
                    >
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
                            {/* <Sheet
                                ref={bottomSheetModalRef}
                                snapPoints={["75%"]}
                            >
                                <BottomSheetView className="flex p-4">
                                    <Text
                                        variant="largeTitle"
                                        className="tracking-wider font-semibold"
                                    >
                                        Welcome to Guider!
                                    </Text>
                                </BottomSheetView>
                            </Sheet> */}
                            <Toaster
                                theme={colorScheme}
                                position="bottom-center"
                                swipeToDismissDirection="left"
                                richColors={true}
                            />
                            <PortalHost />
                        </ThemeProvider>
                    </KeyboardProvider>
                </BottomSheetModalProvider>
            </GestureHandlerRootView>
        </SafeAreaProvider>
    )
}
