type Props = {
  name: string;
};

const ProjectName = (props: Props) => {
  const { name } = props;

  return (
    <div className="project-name-container">
      <h1 className="project-name">{name}</h1>
    </div>
  );
};

export default ProjectName;
