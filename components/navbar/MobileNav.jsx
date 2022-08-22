import NextLink from 'next/link';
import AuthButton from './AuthButton';
import ThemeToggle from './ThemeToggle';
import { Box, Flex, Link, SlideFade } from '@chakra-ui/react';

const MobileNav = ({ isOpen, links }) => {
  return (
    <SlideFade in={isOpen} unmountOnExit={true}>
      <Flex
        boxShadow="none"
        maxW="1280px"
        mx="auto"
        display={[`${isOpen ? 'flex' : 'none'}`, `${isOpen ? 'flex' : 'none'}`, `${isOpen ? 'flex' : 'none'}`, 'none']}
        justifyContent="flex-end"
        top="0"
        py="2"
        position="sticky"
        alignItems="end"
        flexDir="column"
        px="8"
      >
        {links.map((link, index) => {
          if (link.external) {
            return (
              <Link key={index} href={link.url} target="_blank" fontSize="2xl" fontWeight="normal" mb="2" _hover={{}}>
                {link.name}
              </Link>
            );
          } else {
            return (
              <NextLink key={index} href={link.url} passHref>
                <Link fontSize="2xl" fontWeight="normal" mb="2" _hover={{}}>
                  {link.name}
                </Link>
              </NextLink>
            );
          }
        })}
        <Box mb="2">
          <AuthButton />
        </Box>
        <ThemeToggle />
      </Flex>
    </SlideFade>
  );
};

export default MobileNav;
