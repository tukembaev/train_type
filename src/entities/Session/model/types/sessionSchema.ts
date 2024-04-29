import { sessionData } from "features/TypingSession/model/types/modsSchema";
import { History } from "entities/User";

export interface SessionGraph {
    name:string,
    wpm:number,
    raw:number,
}

export interface SessionTypes {
    mode:sessionData["mode"],
    duration:sessionData["duration"],
    language:string,
}
export interface SessionInfo {
    time_s:number,
    words_count:number,
    letters_count:number,
}

export interface SessionSchema {
    session_results: History
    session_info: SessionInfo,
    test_type:SessionTypes,
    graphData: SessionGraph[];
}