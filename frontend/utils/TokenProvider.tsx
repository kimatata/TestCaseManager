'use client';
import { createContext, useState, useEffect, useContext } from 'react';
import { ProjectRoleType, TokenContextType, TokenType } from '@/types/user';
import { TokenProps } from '@/types/user';
import { useRouter, usePathname } from '@/src/navigation';
import {
  isSignedIn as tokenIsSinedIn,
  isAdmin as tokenIsAdmin,
  isProjectEditable as tokenIsProjectEditable,
  checkSignInPage as tokenCheckSignInPage,
  fetchMyRoles,
} from './token';
import { ToastContext } from './ToastProvider';
const LOCAL_STORAGE_KEY = 'landtcms-auth-token';

function storeTokenToLocalStorage(token: TokenType) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(token));
}

function removeTokenFromLocalStorage() {
  localStorage.removeItem(LOCAL_STORAGE_KEY);
}

const defaultContext = {
  token: {
    access_token: '',
    user: null,
  },
  isSignedIn: () => false,
  isAdmin: () => false,
  setToken: (token: TokenType) => {},
  storeTokenToLocalStorage,
  removeTokenFromLocalStorage,
};
const TokenContext = createContext<TokenContextType>(defaultContext);

const TokenProvider = ({ toastMessages, locale, children }: TokenProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const toastContext = useContext(ToastContext);

  const [hasRestoreFinished, setHasRestoreFinished] = useState(false);
  const [token, setToken] = useState<TokenType>({
    access_token: '',
    expires_at: 0,
    user: null,
  });
  const [projectRoles, setProjectRoles] = useState<ProjectRoleType[]>([]);

  const isSignedIn = () => {
    return tokenIsSinedIn(token);
  };

  const isAdmin = () => {
    return tokenIsAdmin(token);
  };

  const isProjectEditable = (projectId: number) => {
    return tokenIsProjectEditable(projectRoles, projectId);
  };

  const tokenContext = {
    token,
    projectRoles,
    isSignedIn,
    isAdmin,
    isProjectEditable,
    setToken,
    storeTokenToLocalStorage,
    removeTokenFromLocalStorage,
  };

  const restoreTokenFromLocalStorage = () => {
    const tokenString = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (tokenString) {
      const restoredToken = JSON.parse(tokenString);
      setToken(restoredToken);
    }
    setHasRestoreFinished(true);
  };

  useEffect(() => {
    restoreTokenFromLocalStorage();
  }, []);

  useEffect(() => {
    if (!hasRestoreFinished) {
      return;
    }

    const ret = tokenCheckSignInPage(token, pathname);
    if (!ret.ok) {
      if (ret.reason === 'notoken') {
        toastContext.showToast(toastMessages.needSignedIn, 'error');
      } else if (ret.reason === 'expired') {
        toastContext.showToast(toastMessages.sessionExpired, 'error');
      }

      router.push(ret.redirectPath, { locale: locale });
    }
  }, [pathname, hasRestoreFinished]);

  useEffect(() => {
    async function refreshProjectRoles() {
      if (!hasRestoreFinished || !token || !token.access_token) {
        return;
      }

      try {
        const data = await fetchMyRoles(token.access_token);
        setProjectRoles(data);
      } catch (error: any) {
        console.error('Error in effect:', error.message);
      }
    }

    refreshProjectRoles();
  }, [hasRestoreFinished, token]);

  return <TokenContext.Provider value={tokenContext}>{children}</TokenContext.Provider>;
};

export { TokenContext };
export default TokenProvider;
