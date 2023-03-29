import { createApi } from '@reduxjs/toolkit/query/react'
import fetchDefaultBaseQuery from './BaseQuerySettings'

export const futApiSlice = createApi({
    reducerPath: 'fut_api',
    tagTypes: [
        'patients',
        'patient',
        'careteams',
        'careteam',
        'episode-of-cares',
        "episode-of-care",
        'careplan',
        'careplans',
        'tasks',
        'task',
        'clinical-impressions',
        'clinical-impression',
    ],
    refetchOnMountOrArgChange: true,
    baseQuery: fetchDefaultBaseQuery(),
    endpoints: () => ({}),
})


