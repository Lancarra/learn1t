import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const teacherAPI = createApi({
    reducerPath: 'teacher',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://localhost:7271',
        prepareHeaders: (headers,{getState}) => {
            const token = getState().auth.token;
            if(token) {
                headers.set('Authorization', `Bearer ${token}`);
            }else {
                headers.delete('Authorization');
            }
            return headers;
        }
    }),
    tagTypes:["teacher"],
    endpoints: builder => ({
        getStudentsByTeacher: builder.query({
            query: (value) => ({
                method: "GET",
                url:`/users/get-students/${value}`
            }),
            providesTags:['teacher'],
        })
    })

});
export const {useGetStudentsByTeacherQuery} = teacherAPI;