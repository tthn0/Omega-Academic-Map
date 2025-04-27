import { type Degree } from "./Degree";
import { type Requirement } from "./Requirement";

// import { type Degree } from "./types.Degree.ts";
// import { type Requirement } from "./types.Requirement.ts";

export interface DataFetcher {
  getDegreeId: () => number | null;
  getDegree: (degreeId: number | null) => Promise<Degree | undefined>;
  getRequirements: (degreeId: number | null) => Promise<Requirement[]>;
}
