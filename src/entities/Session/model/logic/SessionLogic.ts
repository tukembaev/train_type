import { Statistic } from "entities/User"
import { updateUserLevel } from "shared/lib/functions/userFunctions"

export const processSessionData = (
    data: any, 
    userStatistic: Statistic | undefined,
    setNewRecord: any,
    userData: any,
    updateUserHistory: any,
    updateUserExpirience: any,
) => {
    const existingRecordIndex = userStatistic?.records.findIndex(
        (item) => item.mode === data.mode && item.duration === data.duration
    )

    const isRecord =
        userStatistic &&
        existingRecordIndex !== undefined &&
        existingRecordIndex >= 0 &&
        userStatistic.records[existingRecordIndex].wpm < data.wpm

    const isFirstRecord = userStatistic && existingRecordIndex === -1

    if (isRecord) {
        const updatedRecords = [...userStatistic.records]
        updatedRecords[existingRecordIndex] = {
            ...updatedRecords[existingRecordIndex],
            ...{
                id: data.id,
                wpm: data.wpm,
                raw: data.raw,
                accurancy: data.acc,
                consistency: data.consistency,
                mode: data.mode,
                duration: data.duration,
                date: data.sessionDate,
            },
        }

        setNewRecord({ data: updatedRecords })
    } else if (isFirstRecord) {
        const updatedRecords = [
            ...userStatistic.records,
            {
                id: data.id,
                wpm: data.wpm,
                raw: data.raw,
                accurancy: data.acc,
                consistency: data.consistency,
                mode: data.mode,
                duration: data.duration,
                date: data.sessionDate,
            },
        ]
        

        setNewRecord({ data: updatedRecords })
    }


    if (userData && data.wpm) {
        const updatedHistory = [...userData.history, data]
        updateUserHistory({
            data: updatedHistory,
        })

        updateUserLevel(
            userData,
            updatedHistory,
            data.wpm,
            updateUserExpirience
        )
    }
    return isRecord || isFirstRecord
}