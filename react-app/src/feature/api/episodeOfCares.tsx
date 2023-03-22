import CreateEpisodeOfCare from '../../models/CreateEpisodeOfCare';
import UpdateEpisodeOfCare from '../../models/UpdateEpisodeOfCare';
import CreateConsent from '../../models/CreateConsent';
import CreateCarePlan from '../../models/CreateCarePlan';
import EpisodeOfCare from '../../models/EpisodeOfCare';
import CarePlan from '../../models/CarePlan';
import Consent from '../../models/Consent';
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
    updateEpisodeOfCare: builder.mutation<number, UpdateEpisodeOfCare>({
      query: (updateEpisodeOfCare) => ({
        url: `episodeofcares/${updateEpisodeOfCare.episodeOfCareId}`,
        method: "PATCH",
        body: { status: updateEpisodeOfCare.status },
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Episodes of Care ${updateEpisodeOfCare.episodeOfCareId} could not be updated`
        }),
      }),
      invalidatesTags: ["episode-of-care"]
    }),
    getConsentsForEpisodeOfCare: builder.query<Consent[], number>({
      query: (episodeOfCareId) => ({
        url: `episodeofcares/${episodeOfCareId}/consents`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Consents for Episodes of Care ${episodeOfCareId} could not be fetched`
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
    postCreateConsentForEpisodeOfCare: builder.mutation<number, CreateConsent>({
      query: (createConsent) => ({
        url: `episodeofcares/${createConsent.episodeOfCareId}/consents`,
        method: "POST",
        body: {status: createConsent.status, category: createConsent.category},
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "Consent could not be created"
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
  useUpdateEpisodeOfCareMutation,
  useGetConsentsForEpisodeOfCareQuery,
  usePostCreateEpisodeOfCareMutation,
  usePostCreateConsentForEpisodeOfCareMutation
} = episodeOfCareSlice;
