
export enum TypingSelection {
    TIME = 'time',
    WORDS = 'words',
    QUOTE = 'quote',
    ZEN = 'zen',
}
export enum TimeDuration {
    TIME15S = 15,
    TIME30S = 30,
    TIME60S = 60,
    TIME120S = 120,
}
export enum WordsQuantity {
    WORDS10 = 10,
    WORDS25S = 25,
    WORDS50S = 50,
    WORDS100S = 100,
}
export enum QuoteType{
    SHORT = 'short',
    MEDIUM = 'medium',
    LONG = 'long',
    THICC = 'thicc'
}
export enum FilterTextType{
    PUNCTUATION = 'punctuation',
    NUMBERS = 'numbers',
}

export interface sessionData {
    mode: TypingSelection;
    duration: TimeDuration | WordsQuantity | QuoteType | 'timeless';
    filters?: FilterTextType[];
    textOfSession?:Array<string>;
}
