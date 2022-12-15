import { useRouter } from 'next/router'
import { useContext, useEffect } from 'react';
import { UserContext } from '../../lib/context';

function ReDirect() {
  const user = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/')
      }
  });
}

export default ReDirect;
