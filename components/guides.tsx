import { View } from "react-native";
import { SearchResults } from "~/app/(tabs)";
import { Link } from "expo-router";
import { Text } from "~/components/nativewindui/Text";
import { List, ListItem } from "./nativewindui/List";
import guideIndex from "~/guides/index.json";

const GuidesView = ({ searchResults }: { searchResults: SearchResults }) => {
    return (
        <View className="h-full w-full pt-2">
            <List
                keyboardShouldPersistTaps="handled"
                // @ts-ignore
                data={searchResults.length > 0 ? searchResults : guideIndex}
                estimatedItemSize={63}
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
                // ListEmptyComponent={
                //     <View className="flex items-center justify-center gap-4">
                //         <Text
                //             variant="largeTitle"
                //             className="font-semibold pt-6"
                //         >
                //             Guider
                //         </Text>
                //         <View className="flex items-center justify-center">
                //             <Text
                //                 variant="body"
                //                 className="text-muted-foreground"
                //             >
                //                 Search for a guide to get started
                //                 {"\n"}
                //             </Text>
                //             <Text
                //                 variant="body"
                //                 className="text-muted-foreground text-center"
                //             >
                //                 During testing, you can search for{"\n"}"How to
                //                 change a tire"
                //             </Text>
                //         </View>
                //     </View>
                // }
                contentContainerClassName="bg-card"
            />
        </View>
    );
};

export { GuidesView };
