import CreateEpisodeOfCare from '../../models/CreateEpisodeOfCare';
import EpisodeOfCare from '../../models/EpisodeOfCare';
import { futApiSlice } from '../../redux/futApiSlice';
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
      providesTags: ["episode-of-care"]
    }),
    getEpisodeOfCare: builder.query<EpisodeOfCare, number>({
      query: (episodeOfCareId) => ({
        url: `episodeofcares/${episodeOfCareId}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Episodes of Care ${episodeOfCareId} could not be fetched`
        }),
      }),
      providesTags: ["episode-of-care"]
    }),
    postCreateEpisodeOfCare: builder.mutation<number, CreateEpisodeOfCare>({
      query: (createEOC) => ({
        url: `episodeofcares`,
        method: "POST",
        body: createEOC,
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "Episode of Care could not be created"
        }),
      }),
      invalidatesTags: ["episode-of-care"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const {
  useGetEpisodeOfCaresQuery,
  useGetEpisodeOfCareQuery,
  usePostCreateEpisodeOfCareMutation
} = episodeOfCareSlice;
