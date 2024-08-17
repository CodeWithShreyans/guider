import { View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useEffect, useState } from "react";
import { stringSimilarity } from "string-similarity-js";
import guideIndex from "~/guides/index.json";
import { GuidesView } from "~/components/guides";
import { SearchInput } from "~/components/nativewindui/SearchInput";

export type SearchResults = {
    title: string;
    slug: string;
    image: string;
    score: number;
}[];

const rankSearch = (
    text: string,
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResults>>
) => {
    const searchResults: SearchResults = [];
    guideIndex.forEach((v) => {
        const score = stringSimilarity(text, v.title);
        if (score > 0.2) {
            searchResults.push({ ...v, score: score });
        }
        console.log(v.title, score);
    });
    searchResults.sort((a, b) => b.score - a.score);

    setSearchResults(searchResults);
};

export default function HomeScreen() {
    // const searchBarPosition = useSharedValue("center") as
    //     | SharedValue<"center">
    //     | SharedValue<"flex-start">;

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResults>([]);

    useEffect(() => console.log("LOG", searchResults), [searchResults]);

    return (
        <SafeAreaView
            style={{
                flex: 1,
                flexDirection: "column",
                alignItems: "flex-start",
                // paddingTop: insets.top,
                // paddingLeft: insets.left,
                // paddingRight: insets.right,
                // paddingBottom: insets.bottom,
            }}
        >
            <View className="w-full px-2">
                <SearchInput
                    value={searchValue}
                    onChangeText={(text) => {
                        setSearchValue(text);
                        rankSearch(text, setSearchResults);
                    }}
                />
            </View>
            <GuidesView searchResults={searchResults} />
        </SafeAreaView>
    );
}
