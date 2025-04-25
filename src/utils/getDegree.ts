import { type Degree } from "../types/Degree";

const degree: Degree = {
  ID: 10004,
  Name: "Bachelor of Science in Computer Science",
  College: "College of Engineering",
  AcademicYears: "2023-2024",
};

export const getDegree = async (degreeId: string): Promise<Degree> => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  return degree;
};
