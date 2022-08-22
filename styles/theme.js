import { extendTheme } from '@chakra-ui/react';

export default extendTheme({
  fonts: {
    heading: '"Ginto", sans-serif',
    body: '"Ginto", sans-serif'
  },
  styles: {
    global: (props) => ({
      '.glass-object': {
        backdropFilter: 'blur(5px) saturate(180%)',
        webkitBackdropFilter: 'blur(5px) saturate(180%)',
        backgroundColor: `${props.colorMode === 'light' ? 'rgba(255, 255, 255, 0.48)' : 'rgba(15, 15, 15, 0.48)'}`
      },
      '.leading-member-card': {
        backgroundColor: `${props.colorMode === 'light' ? '#EDF2F7' : '#FFFFFF14'}`
      },
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'black',
        overflowY: 'scroll'
      }
    })
  }
});
