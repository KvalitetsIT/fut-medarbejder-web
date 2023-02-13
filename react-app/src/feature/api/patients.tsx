
import HandleQuery from '../../redux/EndpointQueryHandler';
import { futApiSlice } from '../../redux/fut-api-slice';
//import handleResponse from '../redux/handleResponse';
import handleResponse from '../../redux/handleResponse';


export interface Patient {
  uuid?: string
  firstName: string
  lastName: string
}


// Define a service using a base URL and expected endpoints
export const patientSlice = futApiSlice.injectEndpoints({
  endpoints: (builder) => ({
  
    getPatient: builder.query<Patient, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `patients/${id}`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: `Patient with id: ${id} could not be fetched` }),
      }),
      providesTags: ["patients"]
    }),
    getPatients: builder.query<Patient[], undefined>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `patients`,
        method: "GET",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Patients could not be fetched" }),
      }),
      providesTags: ["patients"]
    }),
    postPatient: builder.mutation<Patient, Patient>({
      query: (patient) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `patients`,
        method: "POST",
        body: patient,
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Patient could not be created" }),
      }),
      invalidatesTags: ["patients"]
    }),
    deletePatient: builder.mutation<string, string>({
      query: (id) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `patients/${id}`,
        method: "DELETE",
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Patient could not be deleted" }),
      }),
      invalidatesTags: ["patients"]
    }),
    putPatient: builder.mutation<Patient, Patient>({
      query: (patient) => ({
        //url: `${baseurl}/todos?page=${pack.pagination.page}&limit=${pack.pagination.pagesize}`,
        url: `patients/${patient.uuid}`,
        method: "PUT",
        body: patient,
        responseHandler: (res) => handleResponse({ response: res, toastWithResult: false, toastErrorText: "Patient could not be updated" }),
      }),
      invalidatesTags: ["patients"]
    }),
  })
})

// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetPatientQuery, usePutPatientMutation, useGetPatientsQuery, usePostPatientMutation } = patientSlice
