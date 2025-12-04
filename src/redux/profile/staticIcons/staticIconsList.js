import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const staticiconsAPI = createApi({
    reducerPath: 'staticIcons',
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
    tagTypes:["staticIcons"],
    endpoints: builder => ({
        getStaticIcons: builder.query({
            query: () => ({
                method: "GET",
                url:`/api/static-icons`
            }),
            providesTags:['staticIcons'],
        }),
        addStaticIcons: builder.mutation({
            query: (value) => ({
                method: "POST",
                url: `/api/static-icons/blob/upload`,
                body: value
            }),
            invalidatesTags: ['staticIcons'],
        }),

    })
});
export const {useGetStaticIconsQuery, useAddStaticIconsMutation} = staticiconsAPI;