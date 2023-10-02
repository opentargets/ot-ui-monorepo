export const definition = {
  id: "protVista",
  name: "ProtVista",
  shortName: "PV",
  hasData: ({ target }) => {
    return target.proteinIds.some((e) => e.source === "uniprot_swissprot");
  },
};
