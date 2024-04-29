import { sessionData } from "features/TypingSession";

export enum ValidateUserError {
    INCORRECT_USER_DATA = 'INCORRECT_USER_DATA',
    INCORRECT_AGE = 'INCORRECT_AGE',
    INCORRECT_COUNTRY = 'INCORRECT_COUNTRY',
    NO_DATA = 'NO_DATA',
    SERVER_ERROR = 'SERVER_ERROR',
}
export enum Awards {
    COMPLETED_100_SESSIONS = 'COMPLETED_100_SESSIONS',
    BEST_ON_SERVER = 'BEST_ON_SERVER',
    LOGGED_10_IN_A_ROW = 'LOGGED_10_IN_A_ROW',
}
export enum Gender {
    MALE = 'MALE',
    FEMALE = 'FEMALE',
    UNKNOWN = 'UNKNOWN'
}

export type History = {
    id:number|string,
    wpm:number,
    acc:number,
    raw:number,
    consistency:number,
    correct:number,
    incorrect:number,
    time_spend:number,
    mode:string,
    duration:sessionData["duration"],
    language:string,
    sessionDate:number|string,
    graphData: {
        name:string,
        wpm:number,
        raw:number
    }[],
}
export interface User {
        id:number;
    
        level:number;
        overallXP:number;
        currentXP: number;
        username: string;
        password: string;
        bio:string;
        keyboard_model:string;
        gender: Gender;
        created: Date;
        github_url: string;

        country:string;
    
        avatar:string;
        awards:Awards[] | string,
        history:History[]

}


export interface Statistic {
    id?: number | string,
    username?:string,
    overall_tests:number,
    completed_tests:number,
    overall_spended_time:number,
    highest_wpm:number,
    highest_raw:number,
    highest_accuracy:number,
    highest_consistency:number,
    estimated_words_typed:number,
    preferred_mode:string,
    records:{
        id:number|string,
        wpm:number,
        raw:number,
        consistency:number,
        mode:string,
        duration:string|number,
        accurancy: number,
        date:string,
    }[],
     
          

}
export interface UserSchema {
    data: User;
    isLoading: boolean;
    error?: string;
    readonly: boolean;
    validateErrors?: ValidateUserError[];
}
