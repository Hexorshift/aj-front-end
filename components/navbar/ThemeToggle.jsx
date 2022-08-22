import { Tooltip, IconButton, useColorMode } from '@chakra-ui/react';
import { MdLightMode, MdDarkMode } from 'react-icons/md';

const ThemeToggle = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Tooltip label={colorMode === 'light' ? 'Dark Mode' : 'Light Mode'}>
      <IconButton
        borderRadius="full"
        ml="3"
        fontSize="2xl"
        icon={colorMode === 'light' ? <MdDarkMode /> : <MdLightMode />}
        onClick={() => toggleColorMode()}
      />
    </Tooltip>
  );
};

export default ThemeToggle;
