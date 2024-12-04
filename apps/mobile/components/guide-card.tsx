import { Image } from "expo-image";
import { Platform, View } from "react-native";
import type { SearchResult } from "~/app/(tabs)";
import {
	Card,
	CardBadge,
	CardContent,
	CardDescription,
	CardFooter,
	CardImage,
	CardSubtitle,
	CardTitle,
	addOpacityToRgb,
} from "~/components/nativewindui/Card";
import { Button } from "./nativewindui/Button";
import { Text } from "./nativewindui/Text";

export const GuideCard = ({ guide }: { guide: SearchResult }) => {
	return (
		<Card className="min-h-[500px]">
			<CardImage source={""} />
			<CardContent
				linearGradientColors={Platform.select({
					ios: ["transparent", "#0E172488", "#0E1724EE"],
				})}
				className="ios:flex-col-reverse ios:gap-3 gap-1"
			/>

			<CardFooter
				style={Platform.select({
					ios: { backgroundColor: "#0E1724EE" },
				})}
			>
				<Text variant="subhead" className="ios:text-white font-bold">
					{guide.title}
				</Text>
			</CardFooter>
		</Card>
	);
};
