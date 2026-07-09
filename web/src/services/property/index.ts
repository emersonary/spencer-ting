import { PropertyService } from '../../gen/property/v1/property_connect';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';
import { resolveApiBaseUrl } from '../api/transport';

export type Property = {
  id: string;
  slug: string;
  title: string;
  address: string;
  neighborhood: string;
  borough: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  status: string;
  imageUrls: string[];
  description: string;
  features: string[];
  featured: boolean;
  luxury: boolean;
  lat: number;
  lng: number;
  yearBuilt: number;
  monthlyHoa: number;
  monthlyTaxes: number;
};

function mapProperty(p: {
  id: string;
  slug: string;
  title: string;
  address: string;
  neighborhood: string;
  borough: string;
  price: bigint;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  propertyType: string;
  status: string;
  imageUrls: string[];
  description: string;
  features: string[];
  featured: boolean;
  luxury: boolean;
  lat: number;
  lng: number;
  yearBuilt: number;
  monthlyHoa: number;
  monthlyTaxes: number;
}): Property {
  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    address: p.address,
    neighborhood: p.neighborhood,
    borough: p.borough,
    price: Number(p.price),
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    sqft: p.sqft,
    propertyType: p.propertyType,
    status: p.status,
    imageUrls: p.imageUrls ?? [],
    description: p.description,
    features: p.features ?? [],
    featured: p.featured,
    luxury: p.luxury,
    lat: p.lat,
    lng: p.lng,
    yearBuilt: p.yearBuilt,
    monthlyHoa: p.monthlyHoa,
    monthlyTaxes: p.monthlyTaxes,
  };
}

class GrpcPropertyService {
  private client = createClient(
    PropertyService,
    createConnectTransport({ baseUrl: resolveApiBaseUrl() }),
  );

  async list(opts?: { featuredOnly?: boolean; status?: string; limit?: number }) {
    const res = await this.client.listProperties({
      featuredOnly: opts?.featuredOnly ?? false,
      status: opts?.status ?? '',
      limit: opts?.limit ?? 50,
      offset: 0,
    });
    return {
      properties: (res.properties ?? []).map(mapProperty),
      total: res.total,
    };
  }

  async getBySlug(slug: string) {
    const res = await this.client.getProperty({ slug, id: '' });
    return res.property ? mapProperty(res.property) : null;
  }

  async search(params: {
    query?: string;
    neighborhood?: string;
    borough?: string;
    propertyType?: string;
    minPrice?: number;
    maxPrice?: number;
    minBedrooms?: number;
    luxuryOnly?: boolean;
  }) {
    const res = await this.client.searchProperties({
      query: params.query ?? '',
      neighborhood: params.neighborhood ?? '',
      borough: params.borough ?? '',
      propertyType: params.propertyType ?? '',
      minPrice: BigInt(params.minPrice ?? 0),
      maxPrice: BigInt(params.maxPrice ?? 0),
      minBedrooms: params.minBedrooms ?? 0,
      maxBedrooms: 0,
      luxuryOnly: params.luxuryOnly ?? false,
      limit: 50,
      offset: 0,
    });
    return {
      properties: (res.properties ?? []).map(mapProperty),
      total: res.total,
    };
  }

  async submitInquiry(data: {
    name: string;
    email: string;
    phone?: string;
    propertyId?: string;
    message?: string;
    locale?: string;
    intent?: string;
  }) {
    const res = await this.client.submitInquiry({
      name: data.name,
      email: data.email,
      phone: data.phone ?? '',
      propertyId: data.propertyId ?? '',
      message: data.message ?? '',
      locale: data.locale ?? 'en',
      intent: data.intent ?? 'general',
    });
    return res.inquiryId;
  }
}

export const propertyService = new GrpcPropertyService();

export function formatPrice(price: number, locale = 'en-US'): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(price);
}
