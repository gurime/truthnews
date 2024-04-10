export interface Comment {
    id: string;
    userId: string | undefined;
    content: string;
    timestamp: Date;
    userName: string | null | undefined;
    userEmail: string | null | undefined;
  }
  
  export type CommentsCount = number; 