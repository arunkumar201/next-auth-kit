'use client';

import { ThemeProvider } from 'next-themes';

/**
 * Renders a set of theme providers.
 *
 * @param {Object} props - The properties object.
 * @param {React.ReactNode} props.children - The children to be rendered.
 * @return {React.ReactNode} The rendered theme providers.
 */
export function ThemeProviders({
  children,
}: {
  children: React.ReactNode;
}): React.ReactNode {
  return (
    <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
      {children}
    </ThemeProvider>
  );
}
