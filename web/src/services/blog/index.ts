import { BlogService } from '../../gen/blog/v1/blog_connect';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';

export type BlogPostSummary = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  postType: string;
  contentKind: string;
  layoutType: string;
  publishAt?: string;
  status: string;
  published: boolean;
  videoUrl?: string;
  videoProvider?: string;
  videoThumbnailUrl?: string;
};

function mapSummary(p: {
  id: string;
  slug: string;
  title: string;
  summary: string;
  postType: string;
  contentKind: string;
  layoutType: string;
  publishAt?: string;
  status: string;
  published: boolean;
  videoUrl?: string;
  videoProvider?: string;
  videoThumbnailUrl?: string;
}): BlogPostSummary {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    summary: p.summary,
    postType: p.postType,
    contentKind: p.contentKind,
    layoutType: p.layoutType,
    publishAt: p.publishAt || undefined,
    status: p.status,
    published: p.published,
    videoUrl: p.videoUrl || undefined,
    videoProvider: p.videoProvider || undefined,
    videoThumbnailUrl: p.videoThumbnailUrl || undefined,
  };
}

function resolvePostsApiBaseUrl(): string {
  return (import.meta.env.VITE_POSTS_API_URL ?? '').replace(/\/$/, '');
}

class GrpcBlogService {
  private client = createClient(
    BlogService,
    createConnectTransport({ baseUrl: resolvePostsApiBaseUrl() }),
  );

  async listPublished(language: string) {
    const res = await this.client.listPublishedPosts({ projectId: 'spencer-ting', language });
    return (res.posts ?? []).map(mapSummary);
  }

  async getPublished(slug: string, language: string) {
    const res = await this.client.getPublishedPost({ projectId: 'spencer-ting', slug, language });
    return {
      post: mapSummary(res.post!),
      bodyHtml: res.bodyHtml,
    };
  }
}

export const blogService = new GrpcBlogService();
