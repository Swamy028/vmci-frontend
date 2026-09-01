export default function ReadyStage({ jobInfo, onProceed }) {
  return (
    <div className="stage">
      <h2 className="stage-heading">Ready review</h2>
      <p className="stage-subtext">Machine, tooling and workpiece are all confirmed.</p>

      <div className="ready-banner">READY FOR OPERATION</div>

      <div className="summary-group">
        <h3>Job</h3>
        <div className="summary-item"><span>Operation</span><span>{jobInfo.operation}</span></div>
        <div className="summary-item"><span>Program</span><span>{jobInfo.cncProgram} ({jobInfo.drawingRevision})</span></div>
        <div className="summary-item"><span>Material</span><span>{jobInfo.material}</span></div>
        <div className="summary-item"><span>Fixture</span><span>{jobInfo.fixture}</span></div>
        <div className="summary-item"><span>Work offset</span><span>{jobInfo.workOffset}</span></div>
        <div className="summary-item"><span>Quantity</span><span>{jobInfo.quantity}</span></div>
      </div>

      <button className="btn-primary" onClick={onProceed}>
        Proceed to operation
      </button>
    </div>
  );
}
