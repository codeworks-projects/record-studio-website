type MediaType = import("@/types/enums").MediaType;

interface NameValue extends Placeholder {
  name: string;
  value: string | number;
}

interface Translation {
  it: string;
}

interface Pagination {
  page: number;
  size: number;
  total: number;
  numberOfPages: number;
  pageContent: Array<any>;
}

interface ListRecord extends Placeholder {
  id: string;
  name: string | Record<string, unknown> | Translation;
  imageUrl?: string;
  details?: Record<string, any>;
}

interface Placeholder {
  isPlaceholder?: boolean;
}

interface MediaFile {
  id?: string;
  url?: string;
  elaboratedUrl?: string;
  extension?: string;
  mediaType?: MediaType;
  mimeType?: string;
  details?: MediaDetails;
  metadata?: Metadata;
}

interface MediaDetails {
  s3Id: string;
  size: number;
  width: number;
  height: number;
  framerate: number;
  length: number;
}

interface Address {
  zip?: string;
  city?: string;
  province?: string;
  region?: string;
  street?: string;
  streetNumber?: string;
  country?: string;
  position?: GeoPosition;
}

interface GeoPosition {
  lat: number;
  lng: number;
}

type HighlightItem = {
  text: string;
  class?: string;
  style?: string;
};

type GradientColor = {
  start: number[];
  stop: number[];
};
