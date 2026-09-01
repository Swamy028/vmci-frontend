const STAGES = ['MACHINE_CHECKS', 'TOOLS', 'WORKPIECE', 'READY', 'OPERATION'];

export default function ProgressRail({ currentStage }) {
  const currentIndex = STAGES.indexOf(currentStage);

  return (
    <div className="rail" role="img" aria-label={`Stage ${currentIndex + 1} of ${STAGES.length}`}>
      {STAGES.map((stage, i) => (
        <div
          key={stage}
          className={`rail-seg ${i < currentIndex ? 'done' : ''} ${i === currentIndex ? 'active' : ''}`}
        />
      ))}
    </div>
  );
}
