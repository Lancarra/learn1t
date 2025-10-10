import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const modulesAPI = createApi({
    reducerPath: 'modules',
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
    tagTypes:["modules"],
    endpoints: builder => ({
        getModules: builder.query({
            query: () => ({
                method: "GET",
                url:"/course-module/get-all-modules"
            }),
            providesTags:['modules'],
        }),
        addModule: builder.mutation({
                query: (value) => ({
                    method: "POST",
                    url: "/course-module/create-module",
                    body: value
                }),
                invalidatesTags: ['modules'],
        }),
        updateModule: builder.mutation({
                query: (value) => ({
                    method: "PUT",
                    url:"/course-module/update-module",
                    body: value
                }),
                invalidatesTags: ['modules'],
            }),
        deleteModule:builder.mutation({
                query: (value) => ({
                    method: "DELETE",
                    url:"/course-module/delete-module",
                    body: value
                }),
                invalidatesTags: ['modules'],
            }),
        })
});
export const {useGetModulesQuery, useAddModuleMutation, useUpdateModuleMutation, useDeleteModuleMutation} = modulesAPI;