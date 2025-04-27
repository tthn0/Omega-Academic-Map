export type Requirement = {
  ID: number;
  Year: number;
  SortOrder: number;
  SubjectAbbreviation: string;
  SubjectIsActive: boolean;
  CourseNumber: string;
  CourseName: string;
  CourseDescription: string;
  CourseCreditHours: number;
  CourseIsCore: boolean;
  CourseIsActive: boolean;
  SemesterName: string;
  SemesterSortOrder: number;
  SemesterIsActive: boolean;
};
