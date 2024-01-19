function Marquee() {
  return (
    <div className="bg-zinc-700 flex overflow-x-hidden relative">
      <div className="italic animate-marquee relative whitespace-nowrap">
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
      </div>
      <div className="italic absolute top-0  animate-marquee2 whitespace-nowrap">
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
        <span className="mx-8">
          ⚠️
          <strong>WARNING</strong>: This is a Work-In-Progress POC. Don't be
          reckless. No warranties are made ⚠️
        </span>
      </div>
    </div>
  );
}

export default Marquee;
