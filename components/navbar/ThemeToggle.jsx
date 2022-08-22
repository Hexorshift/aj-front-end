import { IconButton, useColorMode } from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <IconButton
      borderRadius="full"
      ml="3"
      fontSize="2xl"
      icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
      onClick={() => toggleColorMode()}
    />
  );
};

export default ThemeToggle;
