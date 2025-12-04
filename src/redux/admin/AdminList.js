import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const adminAPI = createApi({
    reducerPath: 'admin',
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
    tagTypes:["admin"],
    endpoints: builder => ({
        getTeachers: builder.query({
            query: () => ({
                method: "GET",
                url:`/admin/get-teachers`
            }),
            providesTags:['admin'],
        }),
        getStudents: builder.query({
            query: () => ({
                method: "GET",
                url:`/admin/get-students`
            }),
            providesTags:['admin'],
        }),
        getUserById: builder.query({
            query: (userId) => ({
                method: "GET",
                url:`/users/get-user/${userId}`
            }),
            providesTags:['admin'],
        }),
        putAssignStudent: builder.mutation({
            query: (value) => ({
                method: "PUT",
                url:`/users/assign-student`,
                body: value
            }),
            invalidatesTags:['admin'],
        })
    })

});
export const {useGetTeachersQuery, useGetStudentsQuery, useGetUserByIdQuery, usePutAssignStudentMutation} = adminAPI;