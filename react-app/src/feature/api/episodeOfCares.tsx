import EpisodeOfCare from '../../models/EpisodeOfCare';
import { futApiSlice } from '../../redux/fut-api-slice';
import handleResponse from '../../redux/handleResponse';

// Define a service using a base URL and expected endpoints
export const episodeOfCareSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getEpisodeOfCares: builder.query<EpisodeOfCare[], number>({
      query: (careTeamId) => ({
        url: `episodeofcares?careTeamId=${careTeamId}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "Episodes of Cares could not be fetched"
        }),
      }),
      providesTags: ["episodes-of-cares"]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetEpisodeOfCaresQuery } = episodeOfCareSlice;
