import { Link } from "expo-router";
import { View } from "react-native";
import type { SearchResult } from "~/app/(tabs)";
import guideIndex from "~/guides/index.json";
import { ESTIMATED_ITEM_HEIGHT, List, ListItem } from "./nativewindui/List";

const GuidesView = ({ searchResults }: { searchResults: SearchResult[] }) => {
	return (
		<View className="h-full w-screen">
			<List
				keyboardShouldPersistTaps="handled"
				variant="insets"
				// @ts-ignore
				data={searchResults.length > 0 ? searchResults : guideIndex}
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
	);
};

export { GuidesView };
