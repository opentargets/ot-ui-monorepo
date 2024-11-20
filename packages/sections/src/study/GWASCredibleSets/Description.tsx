import { Link } from "ui";

type DescriptionProps = {
  studyId: string;
};

function Description({ studyId }: DescriptionProps) {
  return (
    <>
      GWAS credible sets associated with study {" "}
      <strong>{studyId}</strong>. Source{" "}
      <Link to="../" >
        Open Targets
      </Link>
    </>
  );
}

export default Description;