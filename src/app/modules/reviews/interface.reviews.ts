export interface TReview {
    userName: string;
    userTitle?: string;
    rating: number; // 1 to 5
    comment: string;
    isPublished?: boolean;
    createdAt?: Date;
    updatedAt?: Date;
}
