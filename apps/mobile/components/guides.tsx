import { Link } from "expo-router"
import { View } from "react-native"
import type { SearchResult } from "~/app/(tabs)"
import type GuideIndex from "~/guides/index.json"
import { ESTIMATED_ITEM_HEIGHT, List, ListItem } from "./nativewindui/List"

const GuidesView = ({
    searchResults,
    guideIndex,
}: {
    searchResults: SearchResult[]
    guideIndex: typeof GuideIndex
}) => {
    console.log(guideIndex)
    return (
        <View className="h-full w-screen">
            <List
                keyboardShouldPersistTaps="handled"
                variant="insets"
                // @ts-ignore
                data={
                    searchResults.length > 0
                        ? searchResults
                        : guideIndex.filter((v) => !v.hidden)
                }
                estimatedItemSize={ESTIMATED_ITEM_HEIGHT.titleOnly}
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
            />
        </View>
    )
}

export { GuidesView }
