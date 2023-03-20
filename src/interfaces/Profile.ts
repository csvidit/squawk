export interface Profile {
    id: bigint;
    created_at: Date;
    user_id: string;
    username: string;
    accent_color: string;
    is_complete: boolean;
}
