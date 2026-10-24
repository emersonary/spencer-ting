import { apiHttpUrl } from '../../services/api/transport';
import { readSession } from './storage';

type PostsAdminLaunchResponse = {
  url?: string;
};

export type PostsAdminLaunchResult =
  | { ok: true; url: string }
  | { ok: false; message: string };

function launchErrorMessage(status: number): string {
  switch (status) {
    case 401:
      return 'account.errors.signInRequired';
    case 403:
      return 'account.errors.permissionDenied';
    case 503:
      return 'account.errors.unavailable';
    default:
      return 'account.errors.generic';
  }
}

export async function openPostsAdmin(): Promise<PostsAdminLaunchResult> {
  const session = readSession();
  if (!session?.accessToken) {
    return { ok: false, message: 'account.errors.signInRequired' };
  }

  let res: Response;
  try {
    res = await fetch(apiHttpUrl('/account/posts-admin-launch'), {
      headers: { Authorization: `Bearer ${session.accessToken}` },
    });
  } catch {
    return { ok: false, message: 'account.errors.unavailable' };
  }

  if (!res.ok) {
    return { ok: false, message: launchErrorMessage(res.status) };
  }

  const payload = (await res.json()) as PostsAdminLaunchResponse;
  if (!payload.url) {
    return { ok: false, message: 'account.errors.generic' };
  }

  window.open(payload.url, '_blank', 'noopener,noreferrer');
  return { ok: true, url: payload.url };
}
