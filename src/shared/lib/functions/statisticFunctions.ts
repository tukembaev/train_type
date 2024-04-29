import { Statistic, User } from 'entities/User'
import { sessionData } from 'features/TypingSession'

export const calculateWPM = (lettersCount: number, seconds: number) => {
    const wpm = lettersCount / 5 / (seconds / 60)
    return wpm
}
export const calculateRAW = (
    lettersCount: number,
    seconds: number,
    errorsCount: number,
) => {
    const raw = (lettersCount + errorsCount) / 5 / (seconds / 60)
    return raw
}

export function findMaxWpmByModeAndDuration(
    allRecords: Statistic['records'],
    mode: sessionData['mode'],
    duration: sessionData['duration'],
) {
    const filteredHistory = allRecords.filter(
        (item) => item.mode === mode && item.duration === duration,
    )
    const maxWpmObject = filteredHistory.reduce(
        (max, item) => (item.wpm > max.wpm ? item : max),
        { wpm: -Infinity },
    )

    return maxWpmObject
}

export function calculateHighestValues(userStatistic: Statistic) {
    let highestWPM = 0
    let highestRaw = 0
    let highestAccuracy = 0
    let highestConsistency = 0

    userStatistic.records.forEach((record) => {
        highestWPM = Math.max(highestWPM, record.wpm)
        highestRaw = Math.max(highestRaw, record.raw)
        highestAccuracy = Math.max(highestAccuracy, record.accurancy)
        highestConsistency = Math.max(highestConsistency, record.consistency)
    })

    highestWPM = Math.max(highestWPM, userStatistic.highest_wpm)
    highestRaw = Math.max(highestRaw, userStatistic.highest_raw)
    highestAccuracy = Math.max(highestAccuracy, userStatistic.highest_accuracy)
    highestConsistency = Math.max(
        highestConsistency,
        userStatistic.highest_consistency,
    )

    return {
        highestWPM,
        highestRaw,
        highestAccuracy,
        highestConsistency,
    }
}

export function updateStatistic(
    userData: User,
    userStatistic: Statistic,
    updateUserStatistic: any,
) {
    const calculateTotalDuration = (history: User['history']) => {
        const numericDurations = history
            .filter((item) => typeof item.time_spend === 'number')
            .map((item) =>
                typeof item.time_spend === 'number' ? item.time_spend : 0,
            )

        return numericDurations.reduce((total, item) => total + item, 0)
    }

    const calculateTotalCorrect = (history: User['history']) => {
        return history.reduce((total, item) => total + item.correct, 0)
    }
    const modeCounts: { [key: string]: number } = {}
    userData.history.forEach((item) => {
        modeCounts[item.mode] = (modeCounts[item.mode] || 0) + 1
    })

    // Находим режим с наибольшим количеством встречаемости
    let mostCommonMode = ''
    let maxCount = 0
    Object.entries(modeCounts).forEach(([mode, count]) => {
        if (count > maxCount) {
            mostCommonMode = mode
            maxCount = count
        }
    })
    if (userStatistic && userData) {
        const { highestWPM, highestRaw, highestAccuracy, highestConsistency } =
            calculateHighestValues(userStatistic)
        const totalDuration = calculateTotalDuration(userData.history)
        const totalWords = calculateTotalCorrect(userData.history)

        const updateData = {
            id: '1',
            overall_tests: userData.history.length,
            completed_tests: userData.history.length,
            overall_spended_time: totalDuration,
            highest_wpm: highestWPM,
            highest_raw: highestRaw,
            highest_accuracy: highestAccuracy,
            highest_consistency: highestConsistency,
            estimated_words_typed: totalWords / 5,
            preferred_mode: mostCommonMode,
            records: userStatistic.records,
        }
        updateUserStatistic({ data: updateData })
    }
}
