export type ProjectStage = {
  id: number;
  name: string;
  order: number;
  ticketQuantity?: number;
};

export type ProjectRequestType = {
  id: number;
  name: string;
};

export type Project = {
  name: string;
  logoUrl: string;
  stages: ProjectStage[];
  requestTypes: ProjectRequestType[];
};
