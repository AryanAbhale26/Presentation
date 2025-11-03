import React from "react";
import { useParams } from "react-router";

const Project = () => {
  const { projectId } = useParams();
  return <div>Project{projectId}</div>;
};

export default Project;
