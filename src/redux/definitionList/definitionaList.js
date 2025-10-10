import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const definitionsAPI = createApi({
    reducerPath: 'definitions',
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
    tagTypes:["definitions"],
    endpoints: builder => ({
        getDefinitions: builder.query({
            query: (dictionaryId) => ({
                method: "GET",
                url:`/definition/get-all-definitions/${dictionaryId}`
            }),
            providesTags:['definitions'],
        }),
        addDefinition: builder.mutation({
            query: (value) => ({
                method: "POST",
                url:`/definition/create-definition`,
                body: value
            }),
            invalidatesTags: ['definitions'],
        }),
        updateDefinition: builder.mutation({
            query: (value) => ({
                method: "PUT",
                url:"/definition/update-definition",
                body: value
            }),
            invalidatesTags: ['definitions'],
        }),
        deleteDefinition:builder.mutation({
            query: (value) => ({
                method: "DELETE",
                url:`/definition/delete-definition`,
                body:value
            }),
            invalidatesTags: ['definitions'],
        }),
            getDefinitionById:builder.query({
                query: (definitionId) => ({
                    method: "GET",
                    url:`/definition/get-definition-id/${definitionId}`
                }),
                providesTags:['definitions'],
            })
    })
});
export const {useGetDefinitionsQuery, useAddDefinitionMutation, useUpdateDefinitionMutation, useDeleteDefinitionMutation, useGetDefinitionByIdQuery} = definitionsAPI;