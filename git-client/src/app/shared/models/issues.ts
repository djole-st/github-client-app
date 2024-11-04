import { Reactions } from "./reactions";
import { User } from "./user";


export interface Issue {
  url: string;
  repository_url: string;
  labels_url: string;
  comments_url: string;
  events_url: string;
  html_url: string;
  id: number;
  node_id: string;
  number: number;
  title: string;
  user: User;
  labels: any[];
  state: string;
  locked: boolean;
  assignee: User | null;
  assignees: User[];
  milestone: any | null; 
  comments: number;
  created_at: string;
  updated_at: string;
  closed_at: string | null;
  author_association: string;
  active_lock_reason: string | null;
  body: string;
  closed_by: User | null;
  reactions: Reactions;
  timeline_url: string;
  performed_via_github_app: any | null;
  state_reason: string | null;
}
