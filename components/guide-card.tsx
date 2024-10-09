import { Platform, View } from "react-native";
import {
    addOpacityToRgb,
    Card,
    CardBadge,
    CardContent,
    CardDescription,
    CardFooter,
    CardImage,
    CardSubtitle,
    CardTitle,
} from "~/components/nativewindui/Card";
import { Image } from "expo-image";
import { Text } from "./nativewindui/Text";
import { Button } from "./nativewindui/Button";
import { SearchResult } from "~/app/(tabs)";

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
