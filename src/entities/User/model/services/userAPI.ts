import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { $api } from 'shared/api/api'
import { USER_LOCALSTORAGE_ID } from 'shared/const/localstorage'
import { History, Statistic, User } from '../types/user'

export const userAPI = createApi({
    reducerPath: 'userAPI',
    baseQuery: fetchBaseQuery({ baseUrl: $api}),
    tagTypes: ['Statistic' , 'User'],
    endpoints: (builder) => ({
        getAllUsers: builder.query<User[], string>({
            query: () => `users`,
            
            transformResponse: (response: any) => {
                const users = response
                return users
            },
            providesTags: ['User']

        }),
        getAllUsersStatistic: builder.query<Statistic[], string>({
            query: () => `statistic`,
            
            transformResponse: (response: any) => {
                const usersStatistic = response
                return usersStatistic
            },
            providesTags: ['Statistic']

        }),
        getUserById: builder.query<User, number |string | null>({
            query: () => ({
                url: `/users/${localStorage.getItem(USER_LOCALSTORAGE_ID)}/`,
             }),
             transformResponse: (response: User) => {
                const users = response
                return users
            },
            providesTags: ['User']
        }),
        getUserStatistic: builder.query<Statistic, string>({
            query: () => ({
                url: `/statistic/${localStorage.getItem(USER_LOCALSTORAGE_ID)}/`,
             }),
             providesTags: ['Statistic']
        }),
        getUserHistory: builder.query<User["history"], string>({
            query: () => ({
                url: `/users/${localStorage.getItem(USER_LOCALSTORAGE_ID)}/`,
             }),
             transformResponse: (response: any) => {
                const users = response.history.reverse()
                return users
            },
            providesTags: ['User']

        }),
        updateUserHistory: builder.mutation<Statistic, {  data: History[] }>({
            query: ({ data }) => ({
                url: `/users/${localStorage.getItem(USER_LOCALSTORAGE_ID)}`,
                method: 'PATCH',
                body: JSON.stringify({ history: data }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ["User"],
        }),
        updateUserInfo: builder.mutation<Statistic, {  data: { bio: string; keyboard_model: string; } }>({
            query: ({ data }) => ({
                url: `/users/${localStorage.getItem(USER_LOCALSTORAGE_ID)}`,
                method: 'PATCH',
                body: JSON.stringify({
                    bio: data.bio,
                    keyboard_model: data.keyboard_model,
                }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ["User"],
        }),
        updateUserRecord: builder.mutation<Statistic, {  data: Statistic['records'] }>({
            query: ({ data }) => ({
                url: `/statistic/${localStorage.getItem(USER_LOCALSTORAGE_ID)}`,
                method: 'PATCH',
                body: JSON.stringify({ records: data }),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ["Statistic"],
        }),
        updateUserStatistic: builder.mutation<Statistic, {  data: Statistic }>({
            query: ({ data }) => ({
                url: `/statistic/${localStorage.getItem(USER_LOCALSTORAGE_ID)}`,
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ["Statistic"],
        }),
        updateUserExpirience: builder.mutation<Statistic, {  data: Partial<User> }>({
            query: ({ data }) => ({
                url: `/users/${localStorage.getItem(USER_LOCALSTORAGE_ID)}`,
                method: 'PATCH',
                body: JSON.stringify(data),
                headers: { 'Content-Type': 'application/json' },
            }),
            invalidatesTags: ["Statistic"],
        }),
       
    }),
})

export const {useGetAllUsersQuery, useGetUserByIdQuery , useGetUserStatisticQuery , useUpdateUserRecordMutation , useUpdateUserHistoryMutation , useGetUserHistoryQuery , useUpdateUserStatisticMutation , useUpdateUserExpirienceMutation , useGetAllUsersStatisticQuery , useUpdateUserInfoMutation} = userAPI