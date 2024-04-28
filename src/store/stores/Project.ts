import { makeAutoObservable } from 'mobx';
import { Project, ProjectStage } from '@/common/type/project.type';
import { dummyProject, dummyProjectMembers, dummyTickets } from './dummy-data';
import { User } from '@/common/type/user.type';

class ProjectStore {
  project: Project = dummyProject;
  members: User[] = dummyProjectMembers;
  stages: ProjectStage[] = dummyProject.stages;

  constructor() {
    this.setTicketQuantity();
    makeAutoObservable(this);
  }

  setTicketQuantity = () => {
    this.stages = this.stages
      .map((stage) => {
        const tickets = dummyTickets.filter(
          (ticket) => ticket.stageId === stage.id,
        );
        return { ...stage, ticketQuantity: tickets.length };
      })
      .sort((a, b) => a.order - b.order);
  };

  setProject = (project: Project) => {
    this.project = project;
  };

  hydrate = (data: { project: Project }) => {
    if (!data) return;
    this.setProject(data.project);
  };
}

export default ProjectStore;
