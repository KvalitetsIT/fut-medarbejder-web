import { createApi } from '@reduxjs/toolkit/query/react'
import fetchDefaultBaseQuery from './BaseQuerySettings'

export const futApiSlice = createApi({
    reducerPath: 'fut_api',
    tagTypes: [
        'patients', 'patient', 'careteams', 'careteam', 'episodes-of-cares'
    ],
    refetchOnMountOrArgChange: true,
    baseQuery: fetchDefaultBaseQuery(),
    endpoints: () => ({}),
})


