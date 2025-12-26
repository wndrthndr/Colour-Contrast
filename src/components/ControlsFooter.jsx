export default function ControlsFooter({ fg, bg, onReverse, onSave }) {
    return (
      <div className="flex gap-6 mt-6">
        <button className="btn" onClick={onReverse}>Reverse colours</button>
        <button className="btn" onClick={onSave}>Save colours</button>
      </div>
    );
  }
  