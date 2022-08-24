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
      '.mdx-prose': {
        '*': {
          fontSize: 'xl'
        },
        h1: {
          fontSize: '6xl'
        },
        h2: {
          fontSize: '5xl'
        },
        h3: {
          fontSize: '4xl'
        },
        h4: {
          fontSize: '3xl'
        },
        h5: {
          fontSize: '2xl'
        },
        h6: {
          fontSize: 'xl'
        },
        p: {
          fontSize: 'xl'
        },
        blockquote: {
          p: '2',
          borderLeft: `2px solid ${props.colorMode === 'light' ? '#000' : '#fff'}`
        },
        pre: {
          code: {
            fontSize: 'md'
          },
          borderRadius: 'md',
          backgroundColor: `${props.colorMode === 'light' ? '#EDF2F7' : '#FFFFFF14'}`,
          p: '3'
        },
        img: {
          borderRadius: 'md'
        }
      },
      body: {
        bg: props.colorMode === 'light' ? 'white' : 'black',
        overflowY: 'scroll'
      }
    })
  }
});
