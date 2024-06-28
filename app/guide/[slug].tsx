import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Text } from "@/components/nativewindui/Text";
import { Stack, useLocalSearchParams, useNavigation } from "expo-router";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { Button } from "@/components/nativewindui/Button";
import { Icon } from "@roninoss/icons";

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
    const navigation = useNavigation();
    const [guide, setGuide] = useState<Guide | null>(null);

    useEffect(() => {
        console.log(slug);
        AsyncStorage.getItem(slug as string).then((guide) => {
            if (!guide) throw new Error("Guide not found");
            setGuide(JSON.parse(guide));
        });

        AsyncStorage.getAllKeys().then((keys) => {
            console.log("keys", keys);
            AsyncStorage.multiGet(keys).then((v) => console.log("values", v));
        });
    }, [slug]);

    return (
        <ScrollView
            style={{
                paddingTop: 12,
                paddingLeft: insets.left + 12,
                paddingRight: insets.right + 12,
                paddingBottom: insets.bottom,
            }}
        >
            <Stack.Screen options={{ title: "" }} />
            <Text variant="largeTitle" className="font-semibold pb-4">
                {guide?.title}
            </Text>
            <View className="flex flex-col gap-4">
                {guide?.steps.map((step, i) => (
                    <View key={i}>
                        <View className="flex flex-row items-end">
                            <Text
                                variant="largeTitle"
                                className="text-muted-foreground"
                            >
                                {i + 1}.{" "}
                            </Text>
                            <Text
                                variant="heading"
                                className="text-xl leading-8"
                            >
                                {step.title}
                            </Text>
                        </View>
                        <Text variant="body" className="text-pretty">
                            {step.description}
                        </Text>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
};

export default GuidePage;
