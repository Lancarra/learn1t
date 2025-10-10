import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const dictionariesAPI = createApi({
    reducerPath: 'dictionaries',
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
    tagTypes:["dictionaries"],
    endpoints: builder => ({
        getDictionaries: builder.query({
            query: (parentFolderId) => ({
                method: "GET",
                url:`/learn-word-dictionary/get-all-dictionaries/${parentFolderId}`
            }),
            providesTags:['dictionaries'],
        }),
        addDictionary: builder.mutation({
            query: (value) => ({
                method: "POST",
                url: "/learn-word-dictionary/create-dictionary",
                body: value
            }),
            invalidatesTags: ['dictionaries'],
        }),
        updateDictionary: builder.mutation({
            query: (value) => ({
                method: "PUT",
                url:"//learn-word-dictionary/update-dictionary",
                body: value
            }),
            invalidatesTags: ['dictionaries'],
        }),
        deleteDictionary:builder.mutation({
            query: (value) => ({
                method: "DELETE",
                url:`/learn-word-dictionary/delete-dictionary`,
                body: value
            }),
            invalidatesTags: ['dictionaries'],
        }),
        /*        getFolderById:builder.query({
                    query: (courseModuleId) => ({
                        method: "GET",
                        url:`/folder/get-all-folders/${courseModuleId}`
                    }),
                    providesTags:['modules'],
                })*/
    })
});
export const {useGetDictionariesQuery, useAddDictionaryMutation, useUpdateDictionaryMutation, useDeleteDictionaryMutation} = dictionariesAPI;