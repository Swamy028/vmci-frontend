const STAGE_COPY = {
  MACHINE_CHECKS: {
    heading: 'Machine checks',
    subtext: 'Confirm each item before moving on to tooling.',
  },
  TOOLS: {
    heading: 'Required tools',
    subtext: 'Insert each tool into the spindle or turret, then confirm it here.',
  },
  WORKPIECE: {
    heading: 'Workpiece setup',
    subtext: 'Arrange and clamp the workpiece, then confirm each step.',
  },
};

export default function ChecklistStage({
  stage,
  items,
  canAdvance,
  busyId,
  onConfirm,
  onNext,
  onPrevious,
}) {
  const copy = STAGE_COPY[stage];

  return (
    <div className="stage">
      <h2 className="stage-heading">{copy.heading}</h2>
      <p className="stage-subtext">{copy.subtext}</p>

      <div className="item-list">
        {items.map((item) => (
          <button
            key={item.id}
            type="button"
            className={`item-row ${item.confirmed ? 'confirmed' : ''}`}
            onClick={() => onConfirm(item.id)}
            disabled={busyId !== null}
          >
            <span className="item-check" aria-hidden="true">
              {item.confirmed ? '✓' : ''}
            </span>

            <span className="item-text">
              <span className="item-label">{item.label}</span>
              <span className="item-detail">{item.detail}</span>
            </span>
          </button>
        ))}
      </div>

      <div className="stage-actions">
        {stage !== 'MACHINE_CHECKS' && (
          <button
            className="btn-secondary"
            onClick={onPrevious}
            disabled={busyId !== null}
          >
            Previous
          </button>
        )}
        <button
          className="btn-primary"
          onClick={onNext}
          disabled={!canAdvance || busyId !== null}
        >
          Next
        </button>
      </div>
    </div>
  );
}