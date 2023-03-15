import Patient from '../../models/Patient';
import { futApiSlice } from '../../redux/futApiSlice';
import handleResponse from '../../redux/handleResponse';

// Define a service using a base URL and expected endpoints
export const patientSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getPatient: builder.query<Patient, { patientId: string, careTeamId: string }>({
      query: ({ patientId, careTeamId }) => ({
        url: `patients/${patientId}?careTeamId=${careTeamId}`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: `Patient with id: ${patientId} could not be fetched`
        }),
      }),
      providesTags: ["patients"]
    }),
    getPatients: builder.query<Patient[], undefined>({
      query: () => ({
        url: `patients`,
        method: "GET",
        responseHandler: (res) => handleResponse({
          response: res, toastWithResult: false,
          toastErrorText: "Patients could not be fetched"
        }),
      }),
      providesTags: ["patients"]
    })
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPatientQuery, useGetPatientsQuery } = patientSlice
