import TARGET_PROFILE_QUERY from './querys/TargetProfile.gql';
import EVIDENCE_PROFILE_QUERY from './querys/EvidenceProfile.gql';
import DRUG_PROFILE_QUERY from './querys/DrugProfile.gql';
import DISEASE_PROFILE_QUERY from './querys/DiseaseProfile.gql';

// subcellularLocation, bibliography, uniprot_variants, protVista

export const INIT_BLOCKS_STATE = [
  {
    id: 'target_ENSG00000001626',
    entity: 'target',
    inputs: ['ENSG00000001626'],
    sections: ['bibliography'],
  },
  {
    id: 'target_ENSG00000183454',
    entity: 'target',
    inputs: ['ENSG00000183454'],
    sections: ['safety'],
  },
  {
    id: 'disease_EFO_0000618',
    entity: 'disease',
    inputs: ['EFO_0000618'],
    sections: ['phenotypes', 'bibliography'],
  },
  {
    id: 'drug_CHEMBL192',
    entity: 'drug',
    inputs: ['CHEMBL192'],
    sections: ['indications'],
  },
  // {
  //   id: 'evidence_ENSG00000183454_Orphanet_1945',
  //   entity: 'evidence',
  //   inputs: ['ENSG00000183454', 'Orphanet_1945'],
  //   sections: ['impc'],
  // },
];

export const ENTITIES = {
  TARGET: 'target',
  EVIDENCE: 'evidence',
  DISEASE: 'disease',
  DRUG: 'drug',
};

export function getBlockName({ entity, data }) {
  switch (entity) {
    case ENTITIES.TARGET:
      return data.target.approvedSymbol;
    case ENTITIES.DISEASE:
      return data.disease.name;
    case ENTITIES.DRUG:
      return data.drug.name;
    case ENTITIES.EVIDENCE:
      return `${data.target.approvedSymbol} - ${data.disease.name}`;
    default:
      return 'Error';
  }
}

export function getBlockProfileQuery({ entity, inputs }) {
  switch (entity) {
    case ENTITIES.TARGET:
      return {
        query: TARGET_PROFILE_QUERY,
        variables: { ensemblId: inputs[0] },
      };
    case ENTITIES.DISEASE:
      return {
        query: DISEASE_PROFILE_QUERY,
        variables: { efoId: inputs[0] },
      };
    case ENTITIES.DRUG:
      return {
        query: DRUG_PROFILE_QUERY,
        variables: { chemblId: inputs[0] },
      };
    case ENTITIES.EVIDENCE:
      return {
        query: EVIDENCE_PROFILE_QUERY,
        variables: { ensemblId: inputs[0], efoId: inputs[1] },
      };
    default:
      return 'Error';
  }
}
