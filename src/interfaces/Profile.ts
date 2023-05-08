export interface Profile {
    id: bigint;
    created_at: Date;
    user_id: string;
    username: string;
    accent_color: string;
    is_complete: boolean;
    followers: Array<String>;
    following: Array<String>;
    incoming_requests: Array<String>;
    outgoing_requests: Array<String>;

}
