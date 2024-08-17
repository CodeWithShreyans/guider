import { Icon } from '@roninoss/icons';
import { Stack } from 'expo-router';
import * as React from 'react';
import { View } from 'react-native';

import { Badge } from '~/components/nativewindui/Badge';
import { useColorScheme } from '~/lib/useColorScheme';

export default function BadgeScreen() {
  const { colors } = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Badge' }} />
      <View className="flex-1 items-center justify-center py-4">
        <View className="flex-row gap-8">
          <View>
            <Icon name="bell-outline" color={colors.foreground} />
            <Badge />
          </View>
          <View>
            <Icon name="bell-outline" color={colors.foreground} />
            <Badge>6</Badge>
          </View>
          <View>
            <Icon name="bell-outline" color={colors.foreground} />
            <Badge variant="info" />
          </View>
          <View>
            <Icon name="bell-outline" color={colors.foreground} />
            <Badge variant="info" maxCount={9}>
              10
            </Badge>
          </View>
        </View>
      </View>
    </>
  );
}