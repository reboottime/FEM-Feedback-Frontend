declare namespace Entities {
  interface TRecord {
    createdAt: string;
    id: string;
    updatedAt: string;
  }

  // User related types
  interface TUser extends TRecord {
    avatar: string;
    role: 'admin' | 'user';
    username: string;
  }

  export interface TAuthedUser extends TUser {
    accessToken: string;
  }

  // Comment related types

  export interface TComment extends TRecord {
    author: Omit<TUser, 'role'>;
    detail: string;
    replyTo?: TComment['id'];
  }

  declare namespace Feedback {
    // Feedback related types

    declare type TCategory = 'UI' | 'UX' | 'Feature' | 'Bug' | 'Enhancement';

    declare type TStatus = 'new' | 'planned' | 'in progress' | 'live';

    declare type TRoadmapStatus = Exclude<TStatus, 'new'>;

    declare interface TFeedback extends TRecord {
      category: TCategory;
      comment_count: number;
      comments: TComment['id'][];
      detail: string;
      status: TStatus;
      title: string;
      vote_count: number;
      votes: TUser['id'][];
    }
  }
}
