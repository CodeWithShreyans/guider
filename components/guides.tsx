import { View } from "react-native";
// import { ImageBackground } from "expo-image";
// import { BlurView } from "expo-blur";
import { SearchResults } from "@/app";
import { Link } from "expo-router";
import { Text } from "@/components/nativewindui/Text";
import { ESTIMATED_ITEM_HEIGHT, List, ListItem } from "./nativewindui/List";

const GuidesView = ({ searchResults }: { searchResults: SearchResults }) => {
    return (
        <View className="h-full w-full pt-2">
            {/* <View className="">
                            <ImageBackground
                                // style={{
                                //     width: "100%",
                                //     height: 200,
                                // }}
                                // className="rounded"
                                source={guide.image}
                            >
                                <BlurView
                                    experimentalBlurMethod="dimezisBlurView"
                                    intensity={100}
                                    className="w-min overflow-hidden"
                                >
                                    <Text
                                        className="text-3xl p-2 w-full"
                                        variant="heading"
                                    >
                                        {guide.title}
                                    </Text>
                                </BlurView>
                            </ImageBackground>
                        </View> */}
            <List
                data={searchResults}
                renderItem={(item) => (
                    <Link
                        href={{
                            pathname: "/guide/[slug]",
                            params: { slug: item.item.slug },
                        }}
                        asChild
                    >
                        <ListItem {...item} />
                    </Link>
                )}
                estimatedItemSize={ESTIMATED_ITEM_HEIGHT.titleOnly}
                ListEmptyComponent={
                    <View className="flex items-center justify-center">
                        <Text
                            variant="largeTitle"
                            className="font-semibold pt-8"
                        >
                            What Should I Do Now?
                        </Text>
                    </View>
                }
                contentContainerClassName="bg-background"
            />
        </View>
    );
};

export { GuidesView };
