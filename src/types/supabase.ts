export interface Database {
  public: {
    Tables: {
      tasks: {
        Row: {
          id: string;
          title: string;
          description: string;
          datetime: string;
          completed: boolean;
          assignee: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          title: string;
          description: string;
          datetime: string;
          completed?: boolean;
          assignee: string;
        };
        Update: {
          title?: string;
          description?: string;
          datetime?: string;
          completed?: boolean;
          assignee?: string;
          updated_at?: string;
        };
      };
    };
  };
}