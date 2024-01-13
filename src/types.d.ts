export type BlogPostProps = {
  _id: string;
  title: string;
  description: string;
  image: string;
  createdAt: string;
};

export type Cloundinary = {
  asset_id: string
  public_id: string
  version: number
  version_id: string
  signature: string
  width: number
  height: number
  format: string
  resource_type: string
  created_at: string
  secure_url: string
};

export type BlogPostPostgres = {
  id: string;
  title: string;
  description: string;
  image: string;
  createdAt: Date;
  numberVotes: number;
};

export type DataRows = {
  rows: BlogPostPostgres[]
}
export type DataResult = {
  result: BlogPostPostgres[]
}
export type DataResultSingle = {
  result: BlogPostPostgres
}