
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { Statistic, User } from 'entities/User';
import { RegisterFormValues } from 'features/Authorization';

import { $api } from 'shared/api/api'

export const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({ baseUrl: $api}),
    tagTypes: ['Statistic' , 'User'],
    endpoints: (builder) => ({
      registerUser: builder.mutation<User, RegisterFormValues >({
        query: (credentials) => ({
            url: '/users',
            method: 'POST',
            body: {
            
                test_completed: '-',
                level: 1,
                overallXP: 0,
                currentXP: 0,
                bio: '-',
                keyboard_model: '-',
                gender: '-',
                created: '-',
                github_url: '-',
       
                country: '-',
               
                avatar: 'https://qph.cf2.quoracdn.net/main-qimg-76911b3b1ed79f24b2e9a52665bd8bf8.webp',
                awards: '-',
                history: [],
                ...credentials
            },
        }),
        invalidatesTags: ["User"], 
    }),
        
          registerUserStatistic: builder.mutation<Statistic, {id:string ,username:string} >({
            query: (credentials) => ({
              url: '/statistic',
              method: 'POST',
              body: {
                overall_tests:'-',
                completed_tests:'-',
                overall_spended_time:0,
                highest_wpm:0,
                highest_raw:0,
                highest_accuracy:0,
                highest_consistency:0,
                estimated_words_typed:0,
                preferred_mode:'-',
                records:[],
                ...credentials},
            }),
          })
         
    }),
})

export const { useRegisterUserMutation , useRegisterUserStatisticMutation } = authAPI