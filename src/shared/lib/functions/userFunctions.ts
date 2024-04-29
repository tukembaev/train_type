import { User } from "entities/User";

const BASE_XP_PER_LEVEL = 100; 
const XP_INCREASE_FACTOR = 0.1; // Процентное увеличение необходимого опыта за каждый уровень

export function calculateLevelAndXP(level: number): {needToEarnXP: number } {
    const needToEarnXP = Math.ceil((level * BASE_XP_PER_LEVEL) * (1 + level * XP_INCREASE_FACTOR));
    return {
        needToEarnXP
    };
}

export function updateUserLevel(userData: User, updatedHistory:User['history'] ,calculatedWPM : number,updateUserExpirience: any) {
    const level = userData?.level
    const overallXP = userData?.overallXP;
    const currentXP = userData?.currentXP;
    const {needToEarnXP} = calculateLevelAndXP(level)

    if (currentXP + calculatedWPM * 0.1 >= needToEarnXP) {
        
        updateUserExpirience({
            data: {
                ...userData,
                history:updatedHistory,
                currentXP: 2, 
                level:level+1,
                overallXP: overallXP + calculatedWPM * 0.1, 
            },
        });
    } else {
        updateUserExpirience({
            data: {
                ...userData,
                history:updatedHistory,
                currentXP: currentXP + calculatedWPM * 0.1, 
                level,
                overallXP: overallXP + calculatedWPM * 0.1, 
            },
        });
    }
}
