
import {type UserSchema , type User, ValidateUserError , type History ,type Statistic } from  './model/types/user'
import UserHistory from './ui/UserHistory/UserHistory'
import UserInfo from './ui/UserInfo/UserInfo'
import UserRecord from './ui/UserRecord/UserRecord'
import UserStatistic from './ui/UserStatistic/UserStatistic'

import { useGetAllUsersQuery, useGetUserByIdQuery, useGetUserHistoryQuery, useGetUserStatisticQuery, useUpdateUserExpirienceMutation, useUpdateUserHistoryMutation, useUpdateUserRecordMutation, useUpdateUserStatisticMutation, useGetAllUsersStatisticQuery, useUpdateUserInfoMutation,userAPI } from './model/services/userAPI'

export {
    userAPI,
    User,
    UserSchema,
    ValidateUserError
}
export{
    History ,Statistic 
}
export{
useUpdateUserRecordMutation,
useGetAllUsersQuery, useGetUserByIdQuery,useGetUserStatisticQuery ,
useUpdateUserHistoryMutation , useGetUserHistoryQuery,
useUpdateUserStatisticMutation ,useUpdateUserExpirienceMutation,
useGetAllUsersStatisticQuery , useUpdateUserInfoMutation
}


export {
    UserInfo,
    UserRecord,
    UserStatistic,
UserHistory,

}

