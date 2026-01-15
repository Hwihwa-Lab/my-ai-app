
export enum OccupancyStatus {
    FREE = 'FREE',
    NORMAL = 'NORMAL',
    BUSY = 'BUSY',
    NONE = 'NONE'
}

export interface ActivityLog {
    id: string;
    status: OccupancyStatus;
    timestamp: Date;
    userName: string;
}

export interface GymState {
    status: OccupancyStatus;
    lastUpdated: Date;
    estimatedCount: number;
}
