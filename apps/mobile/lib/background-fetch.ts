import AsyncStorage from "@react-native-async-storage/async-storage";
import deepEqual from "deep-equal";
import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

const BACKGROUND_FETCH_TASK = "fetch-new-guides";

// 1. Define the task by providing a name and the function that should be executed
// Note: This needs to be called in the global scope (e.g outside of your React components)
TaskManager.defineTask(BACKGROUND_FETCH_TASK, async () => {
    try {
        const baseUrl = "https://content.useguider.com";
        AsyncStorage.setItem("lastFetch", new Date().toISOString());
        const newIndex = await (await fetch(`${baseUrl}/index.json`)).json();
        const storedIndex = await AsyncStorage.getItem("guideIndex");

        if (storedIndex && deepEqual(newIndex, JSON.parse(storedIndex))) {
            return BackgroundFetch.BackgroundFetchResult.NoData;
        }

        await AsyncStorage.setItem("guideIndex", JSON.stringify(newIndex));

        for (const i of newIndex) {
            const guide = await (
                await fetch(`${baseUrl}/${i.slug}.json`)
            ).json();
            await AsyncStorage.setItem(guide.slug, JSON.stringify(guide));
        }

        return BackgroundFetch.BackgroundFetchResult.NewData;
    } catch {
        return BackgroundFetch.BackgroundFetchResult.Failed;
    }
});

// 2. Register the task at some point in your app by providing the same name,
// and some configuration options for how the background fetch should behave
// Note: This does NOT need to be in the global scope and CAN be used in your React components!
const registerBackgroundFetchAsync = async () => {
    return BackgroundFetch.registerTaskAsync(BACKGROUND_FETCH_TASK, {
        minimumInterval: 24 * 60 * 60, // 15 minutes
        stopOnTerminate: false, // android only,
        startOnBoot: true, // android only
    });
};

export { registerBackgroundFetchAsync };
