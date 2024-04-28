import { makeAutoObservable } from 'mobx';
import { Project, ProjectStage } from '@/common/type/project.type';
import { dummyTicketsByBoard } from './dummy-data';
import { User } from '@/common/type/user.type';
import { ProjectStoreData } from '../type';

class ProjectStore {
  project: Project = {} as Project;
  members: User[] = [];
  stages: ProjectStage[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  setTicketQuantity = (stages: ProjectStage[]) => {
    const newStages = stages
      .map((stage) => {
        const tickets = dummyTicketsByBoard.filter(
          (ticket) => ticket.stageId === stage.id,
        );
        return { ...stage, ticketQuantity: tickets.length };
      })
      .sort((a, b) => a.order - b.order);
    return newStages;
  };

  setProject = (project: Project) => {
    this.project = project;
  };

  setMembers = (members: User[]) => {
    this.members = members;
  };

  setStages = (stages: ProjectStage[]) => {
    this.stages = stages;
  };

  findStage = (id: number) => {
    return this.stages.find((stage) => stage.id === id);
  };

  hydrate = ({ project, members }: ProjectStoreData) => {
    members && this.setMembers(members);
    if (project) {
      this.setProject(project);
      const stages = this.setTicketQuantity(project.stages);
      this.setStages(stages);
    }
  };
}

export default ProjectStore;
