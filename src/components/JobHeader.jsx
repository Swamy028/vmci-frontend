export default function JobHeader({ jobInfo }) {
  if (!jobInfo) return null;

  return (
    <div className="job-header">
      <div className="job-title">{jobInfo.partName}</div>

      <div className="job-field">
        Quantity
        <span>{jobInfo.quantity}</span>
      </div>
      <div className="job-field">
        Program
        <span>{jobInfo.cncProgram} ({jobInfo.drawingRevision})</span>
      </div>
      <div className="job-field">
        Material
        <span>{jobInfo.material}</span>
      </div>
      <div className="job-field">
        Fixture / offset
        <span>{jobInfo.fixture} / {jobInfo.workOffset}</span>
      </div>
    </div>
  );
}
