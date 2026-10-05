export interface VoterRecord {
  id: string;
  voterNumber: string;
  serialNo: string;
  fullName: string;
  nameEnglish: string;
  citizenshipNumber: string;
  dob?: string;
  gender: 'महिला' | 'पुरुष' | 'अन्य';
  age: number;
  fatherName: string;
  motherName: string;
  spouseName: string | null;
  provinceId: string;
  districtId: string;
  municipalityId: string;
  wardNo: string;
  pollingLocationId: string;
  pollingCenterName: string;
  fConstituency: string;
  sConstituency: string;
  casteCategory: string;
  casteSubGroup: string;
}

export interface PollingCenterSummary {
  polling_center: string;
  locationId: string;
  expected: number;
  collected: number;
  collectionRate: number;
  maleVoters: number;
  femaleVoters: number;
}

export interface CasteDistributionItem {
  caste: string;
  casteNepali: string;
  category: 'Janajati / Magar' | 'Khas Arya (Brahmin/Chhetri)' | 'Dalit' | 'Other / Diverse';
  count: number;
  percentage: number;
  avgAge: number;
  maleCount: number;
  femaleCount: number;
  topSurnames: string[];
}

export interface AgeSegmentItem {
  range: string;
  rangeLabel: string;
  male: number;
  female: number;
  total: number;
  percentage: number;
  dominantCaste: string;
}

export interface LocalAreaSummary {
  id: string;
  name: string;
  nameNepali: string;
  type: 'गाउँपालिका' | 'नगरपालिका' | 'उपमहानगरपालिका' | 'महानगरपालिका';
  district: string;
  province: string;
  totalWards: number;
  totalPopulation: number;
  expectedVoters: number;
  collectedVoters: number;
  dominantCaste: string;
  medianAge: number;
}

export interface FilterState {
  searchQuery: string;
  pollingCenter: string;
  selectedCasteCategory: string;
  selectedAgeRange: string;
  selectedGender: string;
}
