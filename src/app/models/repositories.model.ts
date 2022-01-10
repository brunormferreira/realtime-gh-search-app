export interface IRepositories {
  total_count: number;
  incomplete_results: boolean;
  items: IRepositoryItems[];
}

export interface IRepositoryItems {
  id: number;
  owner: IOwner;
  created_at: Date;
  default_branch: string;
  description: string;
  forks: number;
  forks_count: number;
  full_name: string;
  html_url: string;
  name: string;
  pushed_at: Date;
  score: number;
  size: number;
  stargazers_count: number;
  watchers_count: number;
}

export interface IOwner {
  avatar_url: string;
  events_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  gravatar_id: string;
  html_url: string;
  id: number;
  login: string;
  node_id: string;
  type: string;
  url: string;
}
