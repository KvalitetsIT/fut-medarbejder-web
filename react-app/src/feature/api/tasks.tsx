import { futApiSlice } from '../../redux/futApiSlice';
import handleResponse from '../../redux/handleResponse';
import Task from '../../models/Task';

// Define a service using a base URL and expected endpoints
export const taskSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getTasksForCareTeam: builder.query<Task[], any>({
      query: ({careTeamId, taskStatus}) => ({
        url: `careteams/${careTeamId}/tasks`,
        method: "GET",
        params: { status: taskStatus},
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Tasks for Care Team ${careTeamId} could not be fetched`
        }),
      }),
      providesTags: ["tasks"]
    }),
    updateTask: builder.mutation<number, any>({
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
  useGetTasksForCareTeamQuery,
  useUpdateTaskMutation,
} = taskSlice
