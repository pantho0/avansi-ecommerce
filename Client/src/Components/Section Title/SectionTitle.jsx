const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div>
      <h2 className="text-center text-3xl font-bold">
        {heading}
      </h2>
      <p className="font-medium text-center text-accent">
        --{subHeading}--
      </p>
    </div>
  );
};

export default SectionTitle;
