export default function HexInput({ value, onChange }) {
    return (
      <div className="panel-thick">
        <input
          className="hex-input"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
    );
  }
  