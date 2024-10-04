import { toast } from "sonner-native";
import { Stack } from "expo-router";
import * as React from "react";
import { Platform, View } from "react-native";
import {
    KeyboardAwareScrollView,
    KeyboardGestureArea,
} from "react-native-keyboard-controller";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Alert } from "~/components/nativewindui/Alert";

import { Button } from "~/components/nativewindui/Button";
import { Form, FormItem, FormSection } from "~/components/nativewindui/Form";
import { Text } from "~/components/nativewindui/Text";
import { TextField } from "~/components/nativewindui/TextField";

const ContributeForm = () => {
    const insets = useSafeAreaInsets();
    const [canSave, setCanSave] = React.useState(false);

    const [mainTitle, setMainTitle] = React.useState("");
    const [steps, setSteps] = React.useState([
        { heading: "", description: "" },
    ]);

    React.useEffect(() => {
        console.log(steps);
    }, [steps]);

    const onChange = () => {
        if (!canSave) {
            setCanSave(true);
        }
    };

    const addStep = () => {
        setSteps([...steps, { heading: "", description: "" }]);
    };

    const removeStep = (index: number) => {
        setSteps((prevSteps) => prevSteps.filter((_, i) => i !== index));
    };

    const updateStep = (
        index: number,
        field: "heading" | "description",
        value: string
    ) => {
        const newSteps = [...steps];
        newSteps[index][field] = value;
        setSteps(newSteps);
    };

    const onSubmit = async () => {
        console.log("submit", steps);
        if (
            !mainTitle ||
            steps.some((step) => !step.heading || !step.description)
        ) {
            toast.error("Please fill out all fields");
            return;
        }

        const response = await fetch("https://guider.shreyans.sh/request", {
            method: "POST",
            body: JSON.stringify({
                mainTitle,
                steps,
            }),
        });

        if (response.ok) {
            toast.success("Submitted!");
        }
    };

    return (
        <KeyboardGestureArea interpolator="ios">
            <KeyboardAwareScrollView
                bottomOffset={8}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                contentContainerStyle={{ paddingBottom: insets.bottom }}
            >
                <Form className="gap-5 px-4 pt-8">
                    <FormSection
                        materialIconProps={{ name: "note-text-outline" }}
                        ios={{
                            title: "",
                        }}
                    >
                        <FormItem>
                            <TextField
                                textContentType="none"
                                autoComplete="off"
                                label={Platform.select({
                                    ios: undefined,
                                    default: "Title",
                                })}
                                leftView={Platform.select({
                                    ios: <LeftLabel>Title</LeftLabel>,
                                })}
                                placeholder={Platform.select({
                                    ios: "required",
                                })}
                                onChange={(e) => {
                                    onChange();
                                    setMainTitle(e.nativeEvent.text);
                                }}
                            />
                        </FormItem>
                    </FormSection>
                    {steps.map((step, index) => (
                        <FormSection
                            key={index}
                            materialIconProps={{
                                name: "clipboard-list-outline",
                            }}
                            ios={{
                                title: `Step ${index + 1}`,
                            }}
                        >
                            <FormItem>
                                <TextField
                                    textContentType="none"
                                    autoComplete="off"
                                    label={Platform.select({
                                        ios: undefined,
                                        default: "Heading",
                                    })}
                                    leftView={Platform.select({
                                        ios: <LeftLabel>Heading</LeftLabel>,
                                    })}
                                    placeholder={Platform.select({
                                        ios: "required",
                                    })}
                                    onChange={(e) => {
                                        onChange();
                                        updateStep(
                                            index,
                                            "heading",
                                            e.nativeEvent.text
                                        );
                                    }}
                                    value={steps[index].heading}
                                />
                                <TextField
                                    textContentType="none"
                                    autoComplete="off"
                                    multiline
                                    labelClassName="text-foreground"
                                    label={Platform.select({
                                        default: "Description",
                                    })}
                                    placeholder={Platform.select({
                                        ios: "required",
                                    })}
                                    onChange={(e) => {
                                        onChange();
                                        updateStep(
                                            index,
                                            "description",
                                            e.nativeEvent.text
                                        );
                                    }}
                                    value={steps[index].description}
                                />
                                {steps.length > 1 && (
                                    <>
                                        <Alert
                                            title="Remove step?"
                                            buttons={[
                                                {
                                                    text: "Cancel",
                                                    style: "cancel",
                                                },
                                                {
                                                    text: "OK",
                                                    onPress: () =>
                                                        removeStep(index),
                                                },
                                            ]}
                                        >
                                            <Button
                                                className="mt-2"
                                                variant="destructive"
                                            >
                                                <Text>Remove</Text>
                                            </Button>
                                        </Alert>
                                    </>
                                )}
                            </FormItem>
                        </FormSection>
                    ))}
                    <View className="items-center">
                        <Button className="px-6 mb-4" onPress={addStep}>
                            <Text>Add Step</Text>
                        </Button>
                        <Button className="px-6" onPress={onSubmit}>
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </Form>
            </KeyboardAwareScrollView>
        </KeyboardGestureArea>
    );
};

export default function FormScreen() {
    return (
        <>
            <Stack.Screen
                options={{
                    headerTitle: "Contribute",
                }}
            />

            <ContributeForm />
        </>
    );
}

function LeftLabel({ children }: { children: string }) {
    return (
        <View className="w-28 justify-center pl-2">
            <Text>{children}</Text>
        </View>
    );
}
