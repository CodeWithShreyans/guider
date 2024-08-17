import { toast } from "@backpackapp-io/react-native-toast";
import { Stack } from "expo-router";
import * as React from "react";
import { Platform, View } from "react-native";
import {
    KeyboardAwareScrollView,
    KeyboardGestureArea,
} from "react-native-keyboard-controller";
import {
    SafeAreaView,
    useSafeAreaInsets,
} from "react-native-safe-area-context";

import { Button } from "~/components/nativewindui/Button";
import { Form, FormItem, FormSection } from "~/components/nativewindui/Form";
import { LargeTitleHeader } from "~/components/nativewindui/LargeTitleHeader";
import { Text } from "~/components/nativewindui/Text";
import { TextField } from "~/components/nativewindui/TextField";
import { cn } from "~/lib/cn";

const RequestForm = () => {
    const insets = useSafeAreaInsets();
    const [canSave, setCanSave] = React.useState(false);

    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [title, setTitle] = React.useState("");
    const [reason, setReason] = React.useState("");

    const onChange = () => {
        if (!canSave) {
            setCanSave(true);
        }
    };

    return (
        <KeyboardGestureArea interpolator="ios">
            <KeyboardAwareScrollView
                bottomOffset={8}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="interactive"
                contentContainerStyle={{ paddingBottom: insets.bottom }}
                scrollEnabled={false}
            >
                <Form className="gap-5 px-4 pt-8">
                    <FormSection
                        materialIconProps={{ name: "person-outline" }}
                        ios={{
                            title: "Personal Details",
                        }}
                    >
                        <FormItem>
                            <TextField
                                textContentType="name"
                                autoComplete="name"
                                autoFocus
                                label={Platform.select({
                                    ios: undefined,
                                    default: "Name",
                                })}
                                leftView={Platform.select({
                                    ios: <LeftLabel>Name</LeftLabel>,
                                })}
                                placeholder={Platform.select({
                                    ios: "required",
                                })}
                                onChange={(e) => {
                                    onChange();
                                    setName(e.nativeEvent.text);
                                }}
                            />
                            <TextField
                                textContentType="emailAddress"
                                autoComplete="email"
                                autoCapitalize="none"
                                label={Platform.select({
                                    ios: undefined,
                                    default: "Email",
                                })}
                                leftView={Platform.select({
                                    ios: <LeftLabel>Email</LeftLabel>,
                                })}
                                placeholder={Platform.select({
                                    ios: "required",
                                })}
                                onChange={(e) => {
                                    onChange();
                                    setEmail(e.nativeEvent.text);
                                }}
                            />
                        </FormItem>
                    </FormSection>
                    <FormSection
                        materialIconProps={{
                            name: "clipboard-list-outline",
                        }}
                        ios={{
                            title: "Request Details",
                        }}
                    >
                        <FormItem>
                            <TextField
                                textContentType="none"
                                autoComplete="off"
                                multiline
                                labelClassName="text-foreground"
                                label={Platform.select({
                                    default: "Title",
                                })}
                                placeholder={Platform.select({
                                    ios: "required",
                                })}
                                onChange={(e) => {
                                    onChange();
                                    setTitle(e.nativeEvent.text);
                                }}
                            />
                        </FormItem>
                        <FormItem>
                            <TextField
                                textContentType="none"
                                autoComplete="off"
                                multiline
                                labelClassName="text-foreground"
                                label={Platform.select({
                                    default: "Reason",
                                })}
                                placeholder={Platform.select({
                                    ios: "required",
                                })}
                                onChange={(e) => {
                                    onChange();
                                    setReason(e.nativeEvent.text);
                                }}
                            />
                        </FormItem>
                    </FormSection>
                    <View className="items-center">
                        <Button
                            className="px-6"
                            onPress={async () => {
                                if (!name || !email || !title || !reason) {
                                    toast.error("Please fill out all fields", {
                                        position: 2,
                                    });
                                    return;
                                }
                                const response = await fetch(
                                    "http://localhost:8081/request",
                                    {
                                        method: "POST",
                                        body: JSON.stringify({
                                            name,
                                            email,
                                            title,
                                            reason,
                                        }),
                                    }
                                );

                                if (response.ok) {
                                    toast.success("Submitted!", {
                                        position: 2,
                                    });
                                }
                            }}
                        >
                            <Text>Submit</Text>
                        </Button>
                    </View>
                </Form>
            </KeyboardAwareScrollView>
        </KeyboardGestureArea>
    );
};

export default function FormScreen() {
    const [submitted, setSubmitted] = React.useState(false);

    return (
        <>
            <LargeTitleHeader
                title="Request"
                searchBar={{ iosHideWhenScrolling: true }}
            />

            <SafeAreaView style={{ paddingTop: 16 }}>
                <RequestForm />
            </SafeAreaView>
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
