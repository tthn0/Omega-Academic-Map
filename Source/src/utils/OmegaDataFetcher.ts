import { getQueryParameter } from "o365.modules.utils.url.ts";
import { type DataFetcher } from "./types.DataFetcher.ts";
import { type Degree } from "./types.Degree.ts";
import { type Requirement } from "./types.Requirement.ts";

export class OmegaDataFetcher implements DataFetcher {
  getDegreeId = (): number | null => {
    const degreeId = getQueryParameter("Degree_ID");
    return degreeId ? parseInt(degreeId) : null;
  };
  getDegree = async (degreeId: number | null): Promise<Degree | undefined> => {
    const dsDegrees = $getDataObjectById("dsDegrees");
    dsDegrees.recordSource.whereClause = `ID = ${degreeId}`;
    await dsDegrees.load();
    const degree: Requirement[] = dsDegrees.data.map((item) => item._item);
    return degree[0];
  };
  getRequirements = async (degreeId: number | null): Promise<Requirement[]> => {
    const dsRequirements = $getDataObjectById("dsRequirements");
    dsRequirements.recordSource.whereClause = `
        Degree_ID = ${degreeId}
        AND CourseIsActive = 1
        AND SubjectIsActive = 1
    `;
    await dsRequirements.load();
    const requirements: Requirement[] = dsRequirements.data.map(
      (item) => item._item
    );
    return requirements;
  };
}
