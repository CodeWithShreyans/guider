import { useState } from "react"
import { View } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"
import { stringSimilarity } from "string-similarity-js"
import { GuidesView } from "~/components/guides"
import { LargeTitleHeader } from "~/components/nativewindui/LargeTitleHeader"
import { SearchInput } from "~/components/nativewindui/SearchInput"
import guideIndex from "~/guides/index.json"

export type SearchResult = {
    title: string
    slug: string
    image: string
    score: number
}

const rankSearch = (
    text: string,
    setSearchResults: React.Dispatch<React.SetStateAction<SearchResult[]>>,
) => {
    const searchResults: SearchResult[] = []
    for (const v of guideIndex) {
        const score = stringSimilarity(text, v.title)
        if (score > 0.2) {
            searchResults.push({ ...v, score: score })
        }
    }
    searchResults.sort((a, b) => b.score - a.score)

    setSearchResults(searchResults)
}

export default function HomeScreen() {
    const [searchValue, setSearchValue] = useState("")
    const [searchResults, setSearchResults] = useState<SearchResult[]>([])

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
                }}
                className="bg-background"
            >
                <View className="w-full px-2">
                    <SearchInput
                        defaultValue={searchValue}
                        onChangeText={(text) => {
                            setSearchValue(text)
                            rankSearch(text, setSearchResults)
                        }}
                    />
                </View>
                <GuidesView searchResults={searchResults} />
            </SafeAreaView>
        </>
    )
}
