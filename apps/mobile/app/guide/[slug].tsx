import AsyncStorage from "@react-native-async-storage/async-storage"
import { getNetworkStateAsync } from "expo-network"
import { Stack, useLocalSearchParams } from "expo-router"
import { useEffect, useState } from "react"
import { FlatList, ScrollView, View, useWindowDimensions } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe"
import { Text } from "~/components/nativewindui/Text"
import { Skeleton } from "~/components/skeleton"
import { useColorScheme } from "~/lib/useColorScheme"

type Guide = {
    title: string
    slug: string
    image?: string
    youtubeVideoId?: string
    medicalDisclaimer?: boolean
    steps: {
        title: string
        description: string
        imageUrl: string
    }[]
}

const GuidePage = () => {
    const { slug } = useLocalSearchParams()
    const insets = useSafeAreaInsets()
    const [guide, setGuide] = useState<Guide | null>(null)
    const [showPlayer, setShowPlayer] = useState(false)
    const [playerLoading, setPlayerLoading] = useState(true)

    const { width } = useWindowDimensions()

    const { isDarkColorScheme } = useColorScheme()

    useEffect(() => {
        AsyncStorage.getItem(slug as string).then((guide) => {
            if (!guide) throw new Error("Guide not found")
            const guideJson = JSON.parse(guide)
            setGuide(guideJson)
            ;(async () => {
                setShowPlayer(
                    ((await getNetworkStateAsync()).isInternetReachable ??
                        false) &&
                        !!guideJson?.youtubeVideoId,
                )
            })()
        })
    }, [slug])

    return (
        <ScrollView
            style={{
                marginTop: 16,
                marginLeft: insets.left + 16,
                paddingRight: insets.right + 16,
            }}
            contentContainerClassName="pb-12"
        >
            <Stack.Screen options={{ title: "" }} />
            <Text variant="largeTitle" className="font-semibold mb-4">
                {guide?.title}
            </Text>
            {guide?.medicalDisclaimer ? (
                <Text
                    variant="callout"
                    className="mb-4 bg-destructive text-destructive-foreground p-2 rounded-xl overflow-hidden text-lg"
                >
                    DISCLAIMER: The information provided is for informational
                    purposes only. It is not intended to be a substitute for
                    professional medical advice, diagnosis or treatment. Always
                    seek the advice of a qualified health care provider.
                </Text>
            ) : null}
            {showPlayer ? (
                <View className={"rounded-xl overflow-hidden mb-4"}>
                    <YoutubePlayer
                        height={
                            !playerLoading
                                ? ((width - insets.right - 32) / 16) * 9
                                : 0
                        }
                        videoId={guide?.youtubeVideoId}
                        play={true}
                        mute={true}
                        volume={100}
                        onChangeState={(e) => {
                            if (e !== PLAYER_STATES.UNSTARTED) {
                                setPlayerLoading(false)
                            } else {
                                setPlayerLoading(true)
                            }
                        }}
                    />
                    {playerLoading ? (
                        // <View
                        //     style={{
                        //         height: ((width - insets.right - 32) / 16) * 9,
                        //     }}
                        //     className="items-center justify-center"
                        // >
                        //     <Icon
                        //         name="arrow-up"
                        //         ios={{
                        //             name: "arrow.triangle.2.circlepath",
                        //             symbolEffect: {
                        //                 type: "pulse",
                        //                 animateBy: "layer",
                        //                 speed: 1,
                        //                 isActive: true,
                        //             },
                        //         }}
                        //         size={40}
                        //         color={COLORS[colorScheme].foreground}
                        //     />
                        // </View>
                        <Skeleton
                            dark={isDarkColorScheme}
                            style={{
                                height: ((width - insets.right - 32) / 16) * 9,
                            }}
                        />
                    ) : null}
                </View>
            ) : null}
            <FlatList
                scrollEnabled={false}
                data={guide?.steps}
                contentContainerClassName="gap-6"
                renderItem={({ item, index }) => (
                    <View key={index} className="gap-1">
                        <View className="flex flex-row items-end">
                            <Text
                                variant="largeTitle"
                                className="text-muted-foreground self-center"
                            >
                                {index + 1}.{" "}
                            </Text>
                            <Text
                                variant="heading"
                                className="text-xl leading-8 flex-1 flex-wrap"
                            >
                                {item.title}
                            </Text>
                        </View>
                        <Text variant="body">
                            {item.description.replaceAll("\n", "\n\n")}
                        </Text>
                    </View>
                )}
            />
        </ScrollView>
    )
}

export default GuidePage
