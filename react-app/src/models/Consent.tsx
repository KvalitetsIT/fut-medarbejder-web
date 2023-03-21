export default interface Consent {
    id: string;
    type: string;
    status: string;
    start: Date;
    end: Date;
    episodeOfCareId: string;
    patientId: string;
}
  