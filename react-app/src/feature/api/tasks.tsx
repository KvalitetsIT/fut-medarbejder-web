import { futApiSlice } from '../../redux/futApiSlice';
import handleResponse from '../../redux/handleResponse';
import Task from '../../models/Task';
import UpdateTask from '../../models/UpdateTask';

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
    getTaskByIdForCareTeam: builder.query<Task, any>({
      query: ({careTeamId, taskId}) => ({
        url: `careteams/${careTeamId}/tasks/${taskId}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Task ${taskId} could not be fetched`
        }),
      }),
      providesTags: ["tasks"]
    }),
    updateTask: builder.mutation<number, UpdateTask>({
      query: (updateTask) => ({
        url: `episodeofcares/${updateTask.episodeOfCareId}/tasks/${updateTask.id}`,
        method: "PATCH",
        body: { status: updateTask.status },
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Task ${updateTask.id} could not be updated`
        }),
      }),
      invalidatesTags: ["tasks"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { 
  useGetTasksForCareTeamQuery,
  useGetTaskByIdForCareTeamQuery,
  useUpdateTaskMutation,
} = taskSlice
