export default interface ClinicalImpression {
    id: string;
    type: string;
    finding: string;
    date: Date;
    questionnaireResponseId: string;
}
  