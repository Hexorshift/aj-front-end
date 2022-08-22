import { useSession, signIn, signOut } from 'next-auth/react';
import { Button, Tooltip } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

const AuthButton = () => {
  const { data, status } = useSession();

  if (status === 'authenticated') {
    return (
      <Tooltip label="Log out" placement="bottom">
        <Button leftIcon={<FaDiscord size={30} />} width="140px" borderRadius="full" onClick={() => signOut()}>
          Log out
        </Button>
      </Tooltip>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Tooltip label="Log in with Discord" placement="bottom">
        <Button leftIcon={<FaDiscord size={30} />} width="140px" borderRadius="full" onClick={() => signIn('discord')}>
          Log in
        </Button>
      </Tooltip>
    );
  } else {
    return <Button width="140px" borderRadius="full" isLoading />;
  }
};

export default AuthButton;
