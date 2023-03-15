import { futApiSlice } from '../../redux/futApiSlice';
import CareTeam from '../../models/CareTeam';
import handleResponse from '../../redux/handleResponse';

// Define a service using a base URL and expected endpoints
export const careTeamSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getCareTeams: builder.query<CareTeam[], undefined>({
      query: () => ({
        url: `careteams`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "CareTeams could not be fetched"
        }),
      }),
      providesTags: ["careteams"]
    }),
    getCareTeam: builder.query<CareTeam, number>({
      query: (id) => ({
        url: `careteams/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `CareTeam  ${id} could not be fetched`
        }),
      }),
      providesTags: ["careteam"]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCareTeamsQuery, useGetCareTeamQuery } = careTeamSlice
