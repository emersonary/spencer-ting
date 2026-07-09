import {
  createConnectAccountClient,
  createLocalStorageSessionStorage,
} from '@emersonary/appkit-accounts';
import { resolveApiBaseUrl } from '../../services/api/transport';

const storage = createLocalStorageSessionStorage('spencer_ting_account_session');

export const spencerTingAccountClient = createConnectAccountClient({
  baseUrl: resolveApiBaseUrl(),
  storage,
});
