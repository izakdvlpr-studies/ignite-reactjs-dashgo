import { createContext, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useDisclosure, UseDisclosureReturn } from '@chakra-ui/hooks';

interface SideBarDrawerContextProps {
  children: ReactNode;
}

type SideBarDrawerContextData = UseDisclosureReturn;

export const SideBarDrawerContext = createContext(
  {} as SideBarDrawerContextData,
);

export function SideBarDrawerProvider({ children }: SideBarDrawerContextProps) {
  const disclosure = useDisclosure();

  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
  }, [router.asPath]);

  return (
    <SideBarDrawerContext.Provider value={disclosure}>
      {children}
    </SideBarDrawerContext.Provider>
  );
}
