export default interface CarePlan {
    id: string;
    status: string;
    start: Date;
    end: Date;
    patientId: string;
    careTeamId: string;
    episodeOfCareId: string;
}
  