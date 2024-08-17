import { Icon } from '@roninoss/icons';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import Animated, { FadeIn, LinearTransition, ZoomOut } from 'react-native-reanimated';

import { Button } from '~/components/nativewindui/Button';
import { LargeTitleHeader } from '~/components/nativewindui/LargeTitleHeader';
import { LargeTitleSearchBarRef } from '~/components/nativewindui/LargeTitleHeader/types';
import { Text } from '~/components/nativewindui/Text';
import { useColorScheme } from '~/lib/useColorScheme';

export default function LargeTitleHeaderScreen() {
  const { colors } = useColorScheme();
  const searchBarRef = React.useRef<LargeTitleSearchBarRef>(null);
  const [materialPreset, setMaterialPreset] = React.useState<'stack' | 'inline'>('stack');
  return (
    <>
      <LargeTitleHeader
        title="Large title"
        materialPreset={materialPreset}
        rightView={() => (
          <Button variant="plain" size="icon">
            <Icon size={24} name="account-circle-outline" color={colors.foreground} />
          </Button>
        )}
        searchBar={{
          ref: searchBarRef,
          onChangeText: (text) => {
            console.log(text);
          },
          materialRightView() {
            return (
              <Animated.View entering={FadeIn} exiting={ZoomOut}>
                <Button variant="plain" size="icon">
                  <Icon size={24} name="cog-outline" color={colors.foreground} />
                </Button>
              </Animated.View>
            );
          },
          content: (
            <KeyboardAwareScrollView
              className="ios:bg-background/95"
              contentContainerClassName="flex-1"
              keyboardShouldPersistTaps="always">
              <View className="flex-1 items-center justify-center">
                <Text>Search bar content</Text>
              </View>
            </KeyboardAwareScrollView>
          ),
        }}
      />
      <Animated.ScrollView
        layout={LinearTransition}
        contentInsetAdjustmentBehavior="automatic"
        contentContainerClassName="flex-1 py-10 px-6 gap-12">
        <Button
          onPress={() => {
            searchBarRef.current?.focus();
          }}>
          <Text>Focus input</Text>
        </Button>
        {Platform.OS !== 'ios' && (
          <Button
            variant={materialPreset === 'inline' ? 'secondary' : 'tonal'}
            onPress={() => {
              setMaterialPreset((prev) => (prev === 'inline' ? 'stack' : 'inline'));
            }}>
            <Text>Switch to {materialPreset === 'inline' ? 'stack' : 'inline'}</Text>
          </Button>
        )}
      </Animated.ScrollView>
    </>
  );
}
