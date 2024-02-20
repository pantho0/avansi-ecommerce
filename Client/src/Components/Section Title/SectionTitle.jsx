const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div>
      <h2 className="text-center text-base md:text-3xl font-bold">
        {heading}
      </h2>
      <p className="text-xs md:font-medium text-center text-accent">
        --{subHeading}--
      </p>
    </div>
  );
};

export default SectionTitle;
