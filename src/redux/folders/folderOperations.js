import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const foldersAPI = createApi({
    reducerPath: 'folders',
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
    tagTypes:["folders"],
    endpoints: builder => ({
        getFolders: builder.query({
            query: (courseModuleId) => ({
                method: "GET",
                url:`/folder/get-all-folders/${courseModuleId}`
            }),
            providesTags:['folders'],
        }),
        addFolder: builder.mutation({
            query: (value) => ({
                method: "POST",
                url: "/folder/create-folder",
                body: value
            }),
            invalidatesTags: ['folders'],
        }),
        updateFolder: builder.mutation({
            query: (value) => ({
                method: "PUT",
                url:"/folder/update-folder",
                body: value
            }),
            invalidatesTags: ['folders'],
        }),
        deleteFolder:builder.mutation({
            query: (value) => ({
                method: "DELETE",
                url:`/folder/delete-folder/${value}`,
            }),
            invalidatesTags: ['folders'],
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
export const {useGetFoldersQuery, useAddFolderMutation, useUpdateFolderMutation, useDeleteFolderMutation} = foldersAPI;