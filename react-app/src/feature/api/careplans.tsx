import { futApiSlice } from '../../redux/futApiSlice';
import handleResponse from '../../redux/handleResponse';
import CreateCarePlan from '../../models/CreateCarePlan';
import CarePlan from '../../models/CarePlan';

// Define a service using a base URL and expected endpoints
export const carePlanSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    postCreateCarePlan: builder.mutation<number, CreateCarePlan>({
      query: (createCarePlan) => ({
        url: `episodeofcares/${createCarePlan.episodeOfCareId}/careplans`,
        method: "POST",
        body: { plandefinitionId: createCarePlan.planDefinitionId },
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "CarePlan could not be created"
        }),
      }),
      invalidatesTags: ["careplans"]
    }),
    getCarePlansOnEpisodeOfCareForCareTeam: builder.query<CarePlan[], any>({
      query: ({careTeamId, episodeOfCareId}) => ({
        url: `careteams/${careTeamId}/episodeofcares/${episodeOfCareId}/careplans`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Careplans for Episodes of Care ${episodeOfCareId} could not be fetched`
        }),
      }),
      providesTags: ["careplans"]
    }),
    updateCarePlan: builder.mutation<number, any>({
      query: ({episodeOfCareId, carePlanId, updateCarePlan }) => ({
        url: `episodeofcares/${episodeOfCareId}/careplans/${carePlanId}`,
        method: "PATCH",
        body: updateCarePlan,
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `CarePlan ${carePlanId} could not be updated`
        }),
      }),
      invalidatesTags: ["careplans"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  usePostCreateCarePlanMutation, 
  useGetCarePlansOnEpisodeOfCareForCareTeamQuery,
  useUpdateCarePlanMutation
} = carePlanSlice
