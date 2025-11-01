import { tva } from '@gluestack-ui/utils/nativewind-utils';
import { isWeb } from '@gluestack-ui/utils/nativewind-utils';
const baseStyle = isWeb ? 'flex flex-col relative z-0' : '';

export const cardStyle = tva({
  base: `${baseStyle} bg-white`,
  variants: {
    size: {
      sm: 'p-3 rounded-lg',
      md: 'p-4 rounded-lg',
      lg: 'p-6 rounded-xl',
    },
    variant: {
      elevated: 'bg-white shadow-md',
      outline: 'bg-white border border-outline-200',
      ghost: 'bg-transparent rounded-none shadow-none',
      filled: 'bg-background-50 shadow-sm',
    },
  },
  defaultVariants: {
    size: 'md',
    variant: 'elevated',
  },
});
