import Image from 'next/image';
import NextLink from 'next/link';
import AJLogoTransparent from '../../public/AJLogoTransparent.png';
import AuthButton from './AuthButton';
import MobileNav from './MobileNav';
import ThemeToggle from './ThemeToggle';
import { useEffect, useState } from 'react';
import { Flex, IconButton, Link, Box, useDisclosure } from '@chakra-ui/react';
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';

const Navbar = () => {
  const [links] = useState([
    { name: 'Home', url: '/', external: false },
    { name: 'Articles', url: '/articles', external: false },
    { name: 'Leaderboard', url: '/leaderboard', external: false },
    { name: 'Join Us', url: 'https://discord.com/invite/fnCftrH', external: true }
  ]);
  const [glassClass, setGlassClass] = useState('');
  const { isOpen, onToggle } = useDisclosure();

  useEffect(() => {
    const stickNavbar = () => {
      if (window !== undefined) {
        window.scrollY > 1 ? setGlassClass('glass-object') : setGlassClass('');
      }
    };
    window.addEventListener('scroll', stickNavbar);
    return () => {
      window.removeEventListener('scroll', stickNavbar);
    };
  }, []);

  return (
    <>
      <Box top="0" position="sticky" className={glassClass} zIndex="40">
        <Flex maxW="1280px" mx="auto" py="0.5" px="3" justifyContent="space-between" alignItems="center">
          <Flex alignItems="center">
            <Image src={AJLogoTransparent} width={64} height={64} quality={100} />
            <NextLink href="/" passHref>
              <Link fontSize="2xl" fontWeight="normal" _hover={{}}>
                Aka Japan
              </Link>
            </NextLink>
          </Flex>
          <Flex wrap="wrap" alignItems="center">
            <Box display={['none', 'none', 'none', 'flex', 'flex']}>
              {links.map((link, index) => {
                if (link.external) {
                  return (
                    <Link
                      key={index}
                      href={link.url}
                      target="_blank"
                      fontSize="2xl"
                      mr="5"
                      fontWeight="normal"
                      _hover={{}}
                    >
                      {link.name}
                    </Link>
                  );
                } else {
                  return (
                    <NextLink key={index} href={link.url} passHref>
                      <Link fontSize="2xl" mr="5" fontWeight="normal" _hover={{}}>
                        {link.name}
                      </Link>
                    </NextLink>
                  );
                }
              })}
              <AuthButton />
              <ThemeToggle />
            </Box>
          </Flex>
          <IconButton
            display={['flex', 'flex', 'flex', 'none', 'none']}
            icon={isOpen ? <RiCloseLine /> : <RiMenu3Line />}
            fontSize="2xl"
            background="transparent"
            p="0"
            m="0"
            _hover={{}}
            _active={{}}
            onClick={() => onToggle()}
          />
        </Flex>
        <MobileNav className={glassClass} isOpen={isOpen} links={links} />
      </Box>
    </>
  );
};

export default Navbar;
