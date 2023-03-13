export default interface CareTeam {
    uuid?: string;
    name: string;
    status: string;
    reasonCode: [{
        code: string;
        display: string;
    }];
    managingOrganization: [string];
}
  