import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateSessionText } from 'features/TypingSession/ui/TypingSimulator/ui/InputSession/functions/generateSessionText';
import { $api } from 'shared/api/api';
import { generateRandomNumber } from 'shared/lib/functions/typingFunctions/generateRandomNumber';

type responseRandomTextSchema = {
    id: number;
    words:string[];
}

type quoteResponseSchema = {
    id: number;
    short:string[];
    medium:string[];
    long:string[];
    thicc:string[];
}

export const typingAPI = createApi({
    reducerPath: 'typingAPI',
    baseQuery: fetchBaseQuery({ baseUrl: $api }),
    endpoints: (builder) => ({
        getWordsText: builder.query<string, string[]>({
            query: ([language , count]) => `words/${language}/?count=${count}`,
            transformResponse(baseQueryReturnValue: responseRandomTextSchema, _meta, arg) {
                if (!localStorage.getItem(`words_${arg[0]}`)) {
                    localStorage.setItem(`words_${arg[0]}`, JSON.stringify(baseQueryReturnValue.words));
                }
                return generateSessionText(+arg[1] ,baseQueryReturnValue.words)
            },
        }),
        getQuoteText: builder.query<string, string[]>({
            query: ([language , type]) => `quotes/${language}/?type=${type}`,
            transformResponse(baseQueryReturnValue: quoteResponseSchema, _meta, arg) {
                if (!localStorage.getItem(`quotes_${arg[0]}`)) {
                    localStorage.setItem(`quotes_${arg[0]}`, JSON.stringify(baseQueryReturnValue));
                }

                const quoteTypes: { [key: string]: string[] } = {
                    'short': baseQueryReturnValue.short,
                    'medium': baseQueryReturnValue.medium,
                    'long': baseQueryReturnValue.long,
                    'thicc': baseQueryReturnValue.thicc
                };
        
                const randomQuote = quoteTypes[arg[1]];
                const randomIndex = randomQuote ? generateRandomNumber(randomQuote.length - 1) : -1;

                return randomQuote ? randomQuote[randomIndex] : '';
                
            },
        })
        
    }),
    
})

export const { useGetWordsTextQuery , useGetQuoteTextQuery } = typingAPI;
