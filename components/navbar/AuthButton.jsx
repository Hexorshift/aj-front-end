import { useSession, signIn, signOut } from 'next-auth/react';
import { Button } from '@chakra-ui/react';
import { FaDiscord } from 'react-icons/fa';

const AuthButton = () => {
  const { status } = useSession();

  if (status === 'authenticated') {
    return (
      <Button leftIcon={<FaDiscord size={30} />} width="140px" borderRadius="full" onClick={() => signOut()}>
        Log out
      </Button>
    );
  } else if (status === 'unauthenticated') {
    return (
      <Button leftIcon={<FaDiscord size={30} />} width="140px" borderRadius="full" onClick={() => signIn('discord')}>
        Log in
      </Button>
    );
  } else {
    return <Button width="140px" borderRadius="full" isLoading />;
  }
};

export default AuthButton;
