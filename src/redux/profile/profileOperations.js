import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const profilesAPI = createApi({
    reducerPath: 'profiles',
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
    tagTypes:["profiles"],
    endpoints: builder => ({
        updateProfile: builder.mutation({
            query: (value) => ({
                method: "PUT",
                url:"/users/update-user",
                body: value
            }),
            invalidatesTags: ['profiles'],
        }),
        updateProfileBlob:builder.mutation({
            query: ({id, file}) => ({
                method: "POST",
                url:`/users/blob/update/${id}`,
                body: file
            }),
            invalidatesTags: ['profiles'],
        }),
       /* getDefinitionById:builder.query({
            query: (definitionId) => ({
                method: "GET",
                url:`/definition/get-definition-id/${definitionId}`
            }),
            providesTags:['definitions'],
        })*/
    })
});
export const { useUpdateProfileMutation, useUpdateProfileBlobMutation} = profilesAPI;