import { View } from "react-native";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";
import { useState } from "react";
import { stringSimilarity } from "string-similarity-js";
import guideIndex from "~/guides/index.json";
import { GuidesView } from "~/components/guides";
import { SearchInput } from "~/components/nativewindui/SearchInput";
import { LargeTitleHeader } from "~/components/nativewindui/LargeTitleHeader";

export type SearchResult = {
    title: string;
    slug: string;
    image: string;
    score: number;
};

const rankSearch = (
    text: string,
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>
) => {
    const searchResults: SearchResult[] = [];
    guideIndex.forEach((v) => {
        const score = stringSimilarity(text, v.title);
        if (score > 0.2) {
            searchResults.push({ ...v, score: score });
        }
    });
    searchResults.sort((a, b) => b.score - a.score);

    setSearchResults(searchResults);
};

export default function HomeScreen() {
    const insets = useSafeAreaInsets();

    const [searchValue, setSearchValue] = useState("");
    const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

    return (
        <>
            <LargeTitleHeader
                title="Home"
                // searchBar={{ iosHideWhenScrolling: true }}
            />
            <SafeAreaView
                style={{
                    flex: 1,
                    flexDirection: "column",
                    alignItems: "flex-start",
                    paddingTop: insets.top - 16,
                }}
            >
                <View className="w-full px-2">
                    <SearchInput
                        defaultValue={searchValue}
                        onChangeText={(text) => {
                            setSearchValue(text);
                            rankSearch(text, setSearchResults);
                        }}
                    />
                </View>
                <GuidesView searchResults={searchResults} />
            </SafeAreaView>
        </>
    );
}
