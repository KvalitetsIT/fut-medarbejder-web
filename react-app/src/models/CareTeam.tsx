export default interface CareTeam {
    id: string;
    resource: string;
    name: string;
    status: string;
    reasonCode: [{
        code: string;
        display: string;
    }];
    managingOrganization: [string];
}
  