import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "~/components/nativewindui/Text";
import { Stack, useLocalSearchParams } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { FlatList, ScrollView, View } from "react-native";

type Guide = {
    title: string;
    slug: string;
    image: string;
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

    useEffect(() => {
        AsyncStorage.getItem(slug as string).then((guide) => {
            if (!guide) throw new Error("Guide not found");
            setGuide(JSON.parse(guide));
        });
    }, [slug]);

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
            <Text variant="largeTitle" className="font-semibold pb-4">
                {guide?.title}
            </Text>
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
