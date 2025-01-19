export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      board: {
        Row: {
          created_at: string
          id: number
          name: string
        }
        Insert: {
          created_at?: string
          id?: number
          name?: string
        }
        Update: {
          created_at?: string
          id?: number
          name?: string
        }
        Relationships: []
      }
      board_status: {
        Row: {
          created_at: string
          id: number
          title: string
        }
        Insert: {
          created_at?: string
          id?: number
          title?: string
        }
        Update: {
          created_at?: string
          id?: number
          title?: string
        }
        Relationships: []
      }
      issue: {
        Row: {
          board_id: number
          created_at: string
          description: string | null
          epic_id: number | null
          id: number
          is_epic: boolean
          priority: number
          status: number
          title: string
        }
        Insert: {
          board_id?: number
          created_at?: string
          description?: string | null
          epic_id?: number | null
          id?: number
          is_epic?: boolean
          priority?: number
          status?: number
          title?: string
        }
        Update: {
          board_id?: number
          created_at?: string
          description?: string | null
          epic_id?: number | null
          id?: number
          is_epic?: boolean
          priority?: number
          status?: number
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "issue_board_id_fkey"
            columns: ["board_id"]
            isOneToOne: false
            referencedRelation: "board"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issue_epic_id_fkey"
            columns: ["epic_id"]
            isOneToOne: false
            referencedRelation: "issue"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "issue_status_fkey"
            columns: ["status"]
            isOneToOne: false
            referencedRelation: "board_status"
            referencedColumns: ["id"]
          },
        ]
      }
      lift: {
        Row: {
          category: string | null
          created_at: string
          id: number
          name: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          id?: number
          name?: string | null
        }
        Relationships: []
      }
      lift_workout: {
        Row: {
          created_at: string
          id: number
          lift_id: number
          reps: number | null
          sets: number | null
          weight: number | null
          workout_id: number
        }
        Insert: {
          created_at?: string
          id?: number
          lift_id: number
          reps?: number | null
          sets?: number | null
          weight?: number | null
          workout_id: number
        }
        Update: {
          created_at?: string
          id?: number
          lift_id?: number
          reps?: number | null
          sets?: number | null
          weight?: number | null
          workout_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "lift_workout_lift_id_fkey"
            columns: ["lift_id"]
            isOneToOne: false
            referencedRelation: "lift"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "lift_workout_workout_id_fkey"
            columns: ["workout_id"]
            isOneToOne: false
            referencedRelation: "workout"
            referencedColumns: ["id"]
          },
        ]
      }
      workout: {
        Row: {
          created_at: string
          id: number
          location: string
          total_time: number
        }
        Insert: {
          created_at?: string
          id?: number
          location?: string
          total_time: number
        }
        Update: {
          created_at?: string
          id?: number
          location?: string
          total_time?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
