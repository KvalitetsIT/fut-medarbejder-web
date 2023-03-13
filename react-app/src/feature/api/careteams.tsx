
import { futApiSlice } from '../../redux/fut-api-slice';
import CareTeam from '../../models/CareTeam';
import handleResponse from '../../redux/handleResponse';


// Define a service using a base URL and expected endpoints
export const careTeamSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getCareTeams: builder.query<CareTeam[], undefined>({
      query: () => ({
        url: `careteams`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "CareTeams could not be fetched" }),
      }),
      providesTags: ["careteams"]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetCareTeamsQuery } = careTeamSlice
