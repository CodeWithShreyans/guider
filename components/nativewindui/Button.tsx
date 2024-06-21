import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { Platform, Pressable, PressableProps, View, ViewStyle } from 'react-native';

import { TextClassContext } from '@/components/nativewindui/Text';
import * as Slot from '@/components/nativewindui/slot';
import { cn } from '@/lib/cn';
import { useColorScheme } from '@/lib/useColorScheme';
import { COLORS } from '@/theme/colors';

const buttonVariants = cva('flex-row items-center justify-center gap-2', {
  variants: {
    variant: {
      primary: 'ios:active:opacity-80 bg-primary',
      secondary: 'ios:border-primary ios:active:bg-primary/5 border border-foreground/40',
      tonal:
        'ios:bg-primary/10 dark:ios:bg-primary/10 ios:active:bg-primary/15 bg-primary/15 dark:bg-primary/30',
      plain: 'ios:active:opacity-70',
    },
    size: {
      none: '',
      sm: 'py-1 px-2.5 rounded-full',
      md: 'ios:rounded-lg py-2 ios:py-1.5 ios:px-3.5 px-5 rounded-full',
      lg: 'py-3.5 px-5 rounded-xl gap-2',
      icon: 'ios:rounded-lg h-10 w-10 rounded-full',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const androidRootVariants = cva('overflow-hidden', {
  variants: {
    size: {
      none: '',
      icon: 'rounded-full',
      sm: 'rounded-full',
      md: 'rounded-full',
      lg: 'rounded-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

const buttonTextVariants = cva('font-medium', {
  variants: {
    variant: {
      primary: 'text-white',
      secondary: 'ios:text-primary text-foreground',
      tonal: 'ios:text-primary text-foreground',
      plain: 'text-foreground',
    },
    size: {
      none: '',
      icon: '',
      sm: 'text-[15px] leading-5',
      md: 'text-[17px] leading-7',
      lg: 'text-[17px] leading-7',
    },
  },
  defaultVariants: {
    variant: 'primary',
    size: 'md',
  },
});

const ANDROID_RIPPLE = {
  dark: {
    primary: { color: COLORS.dark.grey3, borderless: false },
    secondary: { color: COLORS.dark.grey5, borderless: false },
    plain: { color: COLORS.dark.grey5, borderless: false },
    tonal: { color: COLORS.dark.grey5, borderless: false },
  },
  light: {
    primary: { color: COLORS.light.grey4, borderless: false },
    secondary: { color: COLORS.light.grey5, borderless: false },
    plain: { color: COLORS.light.grey5, borderless: false },
    tonal: { color: COLORS.light.grey6, borderless: false },
  },
};

// Add as class when possible: https://github.com/marklawlor/nativewind/issues/522
const BORDER_CURVE: ViewStyle = {
  borderCurve: 'continuous',
};

type ButtonVariantProps = Omit<VariantProps<typeof buttonVariants>, 'variant'> & {
  variant?: Exclude<VariantProps<typeof buttonVariants>['variant'], null>;
};

type AndroidOnlyButtonProps = {
  /**
   * ANDROID ONLY: The class name of root responsible for hidding the ripple overflow.
   */
  androidRootClassName?: string;
};

type ButtonProps = PressableProps & ButtonVariantProps & AndroidOnlyButtonProps;

const Root = Platform.OS === 'android' ? View : Slot.Pressable;

const Button = React.forwardRef<React.ElementRef<typeof Pressable>, ButtonProps>(
  (
    { className, variant = 'primary', size, style = BORDER_CURVE, androidRootClassName, ...props },
    ref
  ) => {
    const { colorScheme } = useColorScheme();

    return (
      <TextClassContext.Provider value={buttonTextVariants({ variant, size })}>
        <Root
          className={Platform.select({
            ios: undefined,
            default: androidRootVariants({
              size,
              className: androidRootClassName,
            }),
          })}>
          <Pressable
            className={cn(
              props.disabled && 'opacity-50',
              buttonVariants({ variant, size, className })
            )}
            ref={ref}
            style={style}
            android_ripple={ANDROID_RIPPLE[colorScheme][variant]}
            {...props}
          />
        </Root>
      </TextClassContext.Provider>
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonTextVariants, buttonVariants };
export type { ButtonProps };