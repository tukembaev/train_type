import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { $api } from 'shared/api/api'

export const leaderBoardAPI = createApi({
    reducerPath: 'leaderBoardAPI',
    baseQuery: fetchBaseQuery({ baseUrl: $api }),
    endpoints: (builder) => ({
        getLeaderBoardDataByMode: builder.query<any, string>({
            query: () => `/statistic`,
            transformResponse: (response: any) => {
                const arr: any[] = []
                response.forEach((item: any) => {
                    const test = item?.records?.find(
                        (record: any) =>
                            record.mode === 'words' && record.duration === 10,
                    )
                    if (test) {
                        arr.push({
                            id: 0,
                            username: item.username,
                            wpm: test.wpm.toFixed(0),
                            raw: test.raw.toFixed(0),
                            date: test.date,
                        })
                    }
                })
            
                arr.sort((a, b) => b.wpm - a.wpm) 

                arr.forEach((item, index) => {
                    item.id = index + 1;
                });
            
                return arr
            },
            
        }),
        getLeaderBoardDataByMode2: builder.query<any, string>({
            query: () => `/statistic`,
            transformResponse: (response: any) => {
                const arr: any[] = []
                response.forEach((item: any) => {
                    const test = item?.records?.find(
                        (record: any) =>
                            record.mode === 'words' && record.duration === 25,
                    )
                    if (test) {
                        arr.push({
                            id: 0,
                            username: item.username,
                            wpm: test.wpm.toFixed(0),
                            raw: test.raw.toFixed(0),
                            date: test.date,
                        })
                    }
                })
            
                arr.sort((a, b) => b.wpm - a.wpm)

                arr.forEach((item, index) => {
                    item.id = index + 1;
                });
            
                return arr
            },
            
        }),
    }),
})

export const { useGetLeaderBoardDataByModeQuery , useGetLeaderBoardDataByMode2Query } = leaderBoardAPI
