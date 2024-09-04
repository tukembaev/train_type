import { sessionData } from "features/TypingSession/model/types/modsSchema";

export const generateSessionText = (duration: sessionData["duration"] | number , wordsArray:string[]): string => {
    const result = [];
    for (let i = 0; i < +duration; i += 1) {
      const randomIndex = Math.floor(Math.random() * wordsArray.length);
      const randomWord = wordsArray[randomIndex];
      result.push(randomWord);
    }
    return result.join(" ");
}