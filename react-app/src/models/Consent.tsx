export default interface Consent {
    id: string;
    status: string;
    start: Date;
    end: Date;
    episodeOfCareId: string;
    patientId: string;
}
  