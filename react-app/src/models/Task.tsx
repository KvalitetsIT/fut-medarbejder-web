export default interface Task {
    id: string;
    status: string;
    clinicalImpressionId: string;
    episodeOfCareId: string;
    description: string;
    priority: string;
    authoredDate: Date;
    category: string;
}
  