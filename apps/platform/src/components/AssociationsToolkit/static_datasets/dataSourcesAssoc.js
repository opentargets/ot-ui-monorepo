const dataSources = [
  {
    id: "ot_genetics_portal",
    sectionId: "otGenetics",
    label: "OT Genetics",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#open-targets-genetics",
  },
  {
    id: "gene_burden",
    sectionId: "geneBurden",
    label: "Gene Burden",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#gene-burden",
  },
  {
    id: "eva",
    sectionId: "eva",
    label: "ClinVar",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#clinvar",
  },
  {
    id: "genomics_england",
    sectionId: "genomicsEngland",
    label: "GEL PanelApp",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#genomics-england-panelapp",
  },
  {
    id: "gene2phenotype",
    sectionId: "gene2Phenotype",
    label: "Gene2phenotype",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#gene2phenotype",
  },
  {
    id: "uniprot_literature",
    sectionId: "uniprotLiterature",
    label: "UniProt literature",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#uniprot-literature",
  },
  {
    id: "uniprot_variants",
    sectionId: "uniprotVariants",
    label: "UniProt curated variants",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#uniprot-variants",
  },
  {
    id: "orphanet",
    sectionId: "orphanet",
    label: "Orphanet",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#orphanet",
  },
  {
    id: "clingen",
    sectionId: "clinGen",
    label: "ClinGen",
    aggregation: "Genetic association",
    aggregationId: "genetic_association",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#clingen",
  },
  {
    id: "cancer_gene_census",
    sectionId: "cancerGeneCensus",
    label: "Cancer Gene Census",
    aggregation: "Somatic mutations",
    aggregationId: "somatic_mutation",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#cancer-gene-census",
  },
  {
    id: "intogen",
    sectionId: "intOgen",
    label: "IntOGen",
    aggregation: "Somatic mutations",
    aggregationId: "somatic_mutation",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#intogen",
  },
  {
    id: "eva_somatic",
    sectionId: "evaSomatic",
    label: "ClinVar (somatic)",
    aggregation: "Somatic mutations",
    aggregationId: "somatic_mutation",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#clinvar-somatic",
  },
  {
    id: "cancer_biomarkers",
    sectionId: "cancerBiomarkers",
    label: "Cancer Biomarkers",
    aggregation: "Somatic mutations",
    aggregationId: "somatic_mutation",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#cancer-biomarkers",
  },
  {
    id: "chembl",
    sectionId: "chembl",
    label: "ChEMBL",
    aggregation: "Known drug",
    aggregationId: "known_drug",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#chembl",
  },
  {
    id: "crispr_screen",
    sectionId: "crispr_screen",
    label: "CRISPR Screens",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#crispr-screens", // TODO: check this
  },
  {
    id: "crispr",
    sectionId: "crispr",
    label: "Project Score",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#project-score",
  },
  {
    id: "slapenrich",
    sectionId: "slapEnrich",
    label: "SLAPenrich",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 0.5,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#slapenrich",
  },
  {
    id: "progeny",
    sectionId: "progeny",
    label: "PROGENy",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 0.5,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#progeny",
  },
  {
    id: "reactome",
    sectionId: "reactome",
    label: "Reactome",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 1,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#reactome",
  },
  {
    id: "sysbio",
    sectionId: "sysBio",
    label: "Gene signatures",
    aggregation: "Affected pathway",
    aggregationId: "affected_pathway",
    weight: 0.5,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#gene-signatures",
  },
  {
    id: "europepmc",
    sectionId: "europePmc",
    label: "Europe PMC",
    aggregation: "Literature",
    aggregationId: "literature",
    weight: 0.2,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#europe-pmc",
  },
  {
    id: "expression_atlas",
    sectionId: "expression",
    label: "Expression Atlas",
    aggregation: "RNA expression",
    aggregationId: "rna_expression",
    weight: 0.2,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#expression-atlas",
  },
  {
    id: "impc",
    sectionId: "impc",
    label: "IMPC",
    aggregation: "Animal model",
    aggregationId: "animal_model",
    weight: 0.2,
    isPrivate: false,
    docsLink: "https://platform-docs.opentargets.org/evidence#impc",
  },
  {
    id: "ot_crispr_validation",
    sectionId: "validationlab",
    label: "OT Validation",
    aggregation: "Partner-only",
    aggregationId: "partner_only",
    weight: 0.5,
    isPrivate: true,
    docsLink: "https://partner-platform.opentargets.org/projects",
  },
  // Private
  {
    id: "ot_crispr",
    sectionId: "otCrispr",
    label: "OT CRISPR",
    aggregation: "Partner-only",
    aggregationId: "partner_only",
    weight: 0.5,
    isPrivate: true,
    docsLink: "https://partner-platform.opentargets.org/projects",
  },
  // Private
  {
    id: "encore",
    sectionId: "encore",
    label: "ENCORE",
    aggregation: "Partner-only",
    aggregationId: "partner_only",
    weight: 0.5,
    isPrivate: true,
    docsLink: "https://partner-platform.opentargets.org/projects",
  },
  // Private
];

export default dataSources;
