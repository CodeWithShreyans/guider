import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/nativewindui/Text";
import { Stack, useLocalSearchParams } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, useWindowDimensions, View } from "react-native";
import { getNetworkStateAsync } from "expo-network";
import YoutubePlayer, { PLAYER_STATES } from "react-native-youtube-iframe";
import { Icon } from "@roninoss/icons";
import { COLORS } from "~/theme/colors";
import { useColorScheme } from "~/lib/useColorScheme";

type Guide = {
    title: string;
    slug: string;
    image: string;
    youtubeVideoId: string;
    steps: {
        title: string;
        description: string;
        imageUrl: string;
    }[];
};

const GuidePage = () => {
    const { slug } = useLocalSearchParams();
    const insets = useSafeAreaInsets();
    const [guide, setGuide] = useState<Guide | null>(null);
    const [showPlayer, setShowPlayer] = useState(false);
    const [playerLoading, setPlayerLoading] = useState(true);

    const { width } = useWindowDimensions();

    const { colorScheme } = useColorScheme();

    useEffect(() => {
        AsyncStorage.getItem(slug as string).then((guide) => {
            if (!guide) throw new Error("Guide not found");
            const guideJson = JSON.parse(guide);
            setGuide(guideJson);
            (async () => {
                setShowPlayer(
                    (await getNetworkStateAsync()).isInternetReachable! &&
                        !!guideJson?.youtubeVideoId
                );
            })();
        });
    }, [slug]);

    useEffect(() => {
        console.log(playerLoading);
    }, [playerLoading]);

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
                            console.log(e);
                            if (e !== PLAYER_STATES.UNSTARTED) {
                                setPlayerLoading(false);
                            } else {
                                setPlayerLoading(true);
                            }
                        }}
                    />
                    {playerLoading ? (
                        <View
                            style={{
                                height: ((width - insets.right - 32) / 16) * 9,
                            }}
                            className="items-center justify-center"
                        >
                            <Icon
                                name="arrow-up"
                                ios={{
                                    name: "arrow.triangle.2.circlepath",
                                    symbolEffect: {
                                        type: "pulse",
                                        animateBy: "layer",
                                        speed: 1,
                                        isActive: true,
                                    },
                                }}
                                size={40}
                                color={COLORS[colorScheme].foreground}
                            />
                        </View>
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
    );
};

export default GuidePage;
