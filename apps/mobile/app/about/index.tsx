import { Icon } from "@roninoss/icons";
import * as Linking from "expo-linking";
import { Stack } from "expo-router";
import { View } from "react-native";
import Svg, { type SvgProps, Path } from "react-native-svg";
import { Button } from "~/components/nativewindui/Button";
import { Text } from "~/components/nativewindui/Text";
import { useColorScheme } from "~/lib/useColorScheme";

const GithubIcon = (props: SvgProps) => (
	<Svg
		viewBox="0 0 24 24"
		height="50%"
		width="50%"
		{...props}
		fill={props.color}
	>
		<Path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
	</Svg>
);

const AboutPage = () => {
	const { colorScheme } = useColorScheme();
	return (
		<>
			<Stack.Screen
				options={{
					headerTitle: "About",
				}}
			/>
			<View className="gap-4">
				<View className="mx-4 p-3 mt-4 ios:bg-card bg-card/70 border-border rounded-xl">
					<Text variant="title1" className="font-medium">
						Hey👋 I'm Shreyans!
					</Text>
					<Text variant="callout" className="pt-1">
						I'm a software developer, student, and entrepreneur from India.
					</Text>
					<Text variant="callout" className="pt-1">
						While watching a video one day about a how to land a plane, I found
						it impossible for a layperson to memorise the complex steps.
					</Text>
					<Text variant="callout" className="pt-1">
						So I decided to make a simple app with instant access to all kinds
						of emergency guides{" "}
						<Text className="font-semibold">completely offline</Text>.
					</Text>
				</View>
				<View className="flex-row justify-evenly">
					<View className="mx-4 p-3 mt-4 ios:bg-card bg-card/70 border-border rounded-xl">
						<Button
							className="size-20"
							size="icon"
							variant="plain"
							onPress={() => {
								Linking.openURL("https://github.com/CodeWithShreyans/wsidnow");
							}}
						>
							<GithubIcon
								color={colorScheme === "dark" ? "white" : undefined}
							/>
						</Button>
					</View>
					<View className="mx-4 p-3 mt-4 ios:bg-card bg-card/70 border-border rounded-xl flex-row justify-evenly">
						<Button
							className="size-20"
							size="icon"
							variant="plain"
							onPress={() => {
								Linking.openURL("https://shreyans.sh");
							}}
						>
							<Icon
								name="web"
								size={56}
								color={colorScheme === "dark" ? "white" : undefined}
							/>
						</Button>
					</View>
				</View>
			</View>
		</>
	);
};

export default AboutPage;
