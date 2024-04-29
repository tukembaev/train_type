import { typingAPI, useGetQuoteTextQuery, useGetWordsTextQuery } from "./model/services/typingAPI";
import typingSlice, { deleteUncorrectLetter, getDuration, getErrors, getFilter, getLanguage, getMode, getReload, getText, selectDuration, selectMode, setErrorsCount, setLanguage, setReload, setTextSession, toggleFilter } from "./model/slices/typingSlice";
import { FilterTextType, QuoteType, TimeDuration, TypingSelection, WordsQuantity ,type sessionData} from "./model/types/modsSchema";
import { typingLanguageSelection } from "./model/types/typingSchema";
import LanguageSelection from "./ui/LanguageSelection/LanguageSelection";
import ModeBar from "./ui/ModeBar/ui/ModeBar";  
import TypingSimulator from "./ui/TypingSimulator/TypingSimulator";

export{
    TypingSelection,
    TimeDuration,
    WordsQuantity,
    sessionData,
    QuoteType,
    FilterTextType,
    typingLanguageSelection
}
export {
    ModeBar,
LanguageSelection,

    TypingSimulator,
    typingSlice
};
export {
    typingAPI
}

//  actions
export {
    setTextSession,
    setErrorsCount,
    setReload,
    setLanguage,
    selectMode,
    toggleFilter,
    selectDuration,
deleteUncorrectLetter

}
export{
    useGetWordsTextQuery,
    useGetQuoteTextQuery,
}

 // selectors
export {
    getText,
    getErrors,
    getReload,
    getLanguage,
    getDuration,
    getFilter,
    getMode,

};

