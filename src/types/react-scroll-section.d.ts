declare module 'react-scroll-section' {
  import type { FC, ReactNode, Context } from 'react';

  interface ScrollContextValue {
    scrollTo: (section: string) => void;
    selected: string | null;
  }

  interface ScrollingProviderProps {
    children: ReactNode;
  }

  interface SectionProps {
    id: string;
    children: ReactNode;
    className?: string;
  }

  interface SectionLinkProps {
    section: string;
    children: (props: { onClick: () => void; isSelected: boolean }) => ReactNode;
  }

  const ScrollingProvider: FC<ScrollingProviderProps>;
  const Section: FC<SectionProps>;
  const SectionLink: FC<SectionLinkProps>;
  const ScrollContext: Context<ScrollContextValue>;

  export { ScrollingProvider, Section, SectionLink, ScrollContext };
}
