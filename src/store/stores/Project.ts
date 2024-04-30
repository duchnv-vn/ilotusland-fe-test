import { makeAutoObservable } from 'mobx';
import {
  Project,
  ProjectRequestType,
  ProjectStage,
} from '@/common/type/project.type';
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
    return this.stages.find((stage) => stage.id === id) as ProjectStage;
  };

  findRequestType = (id: number) => {
    return this.project.requestTypes.find(
      (type) => type.id === id,
    ) as ProjectRequestType;
  };

  hydrate = ({ project, members }: ProjectStoreData) => {
    members && this.setMembers(members);
    if (project) {
      this.setProject(project);
      this.setStages(project.stages);
    }
  };
}

export default ProjectStore;
