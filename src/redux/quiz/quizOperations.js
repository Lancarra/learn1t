import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const quizAPI = createApi({
    reducerPath: 'quiz',
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
    tagTypes:["quiz"],
    endpoints: builder => ({
        getQuiz: builder.query({
            query: (cardId) => ({
                method: "GET",
                url:`/quiz/get-quiz/${cardId}`
            }),
            providesTags:['quiz'],
        }),
        getInfoQuiz: builder.query({
            query: (cardId) => ({
                method: "GET",
                url:`/quiz/get-info/${cardId}`
            }),
            providesTags:['quiz'],
        }),
        addQuiz: builder.mutation({
            query: (value) => ({
                method: "POST",
                url: "/quiz/create-quiz",
                body: value
            }),
            invalidatesTags: ['quiz'],
        }),
        updateQuiz: builder.mutation({
            query: (value) => ({
                method: "PATCH",
                url:"/quiz/update-quiz",
                body: value
            }),
            invalidatesTags: ['quiz'],
        }),
        checkQuiz: builder.mutation({
            query: (value) => ({
                method: "POST",
                url:"/quiz/check-quiz",
                body: value
            }),
            invalidatesTags: ['quiz'],
        }),
        answerQuiz: builder.mutation({
            query: (value) => ({
                method: "POST",
                url:"/quiz/create-answer-quiz",
                body: value
            }),
            invalidatesTags: ['quiz'],
        }),
        checkAnswer: builder.mutation({
            query: (value) => ({
                method: "POST",
                url:"/quiz/check-answer",
                body: value
            }),
            invalidatesTags: ['quiz'],
        })

    })
});
export const {useGetQuizQuery, useGetInfoQuizQuery, useAddQuizMutation,  useUpdateQuizMutation, useCheckQuizMutation, useAnswerQuizMutation, useCheckAnswerMutation} = quizAPI;