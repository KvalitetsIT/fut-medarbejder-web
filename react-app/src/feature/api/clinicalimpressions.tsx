import { futApiSlice } from '../../redux/futApiSlice';
import handleResponse from '../../redux/handleResponse';
import ClinicalImpression from '../../models/ClinicalImpression';

// Define a service using a base URL and expected endpoints
export const clinicalImpressionSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getClinicalImpressionForEpisodeOfCare: builder.query<ClinicalImpression, any>({
      query: ({episodeOfCareId, clinicalImpressionId}) => ({
        url: `episodeofcares/${episodeOfCareId}/clinicalimpressions/${clinicalImpressionId}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Clinical Impression Episode Of Care ${episodeOfCareId} could not be fetched`
        }),
      }),
      providesTags: ["clinical-impressions"]
    }),
    
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetClinicalImpressionForEpisodeOfCareQuery,
} = clinicalImpressionSlice
