
export type PostType ={
    id: number;
    title: string;
    content: string;
    published: boolean;
    created_at: string;
    user_id: number;
}

export type PostVoteType ={
    posting: PostType;
    votes: number;
}