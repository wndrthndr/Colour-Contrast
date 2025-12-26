export default function Navbar({ uiColor }) {
    return (
      <div
        className="w-full py-4 mb-10 border-b border-dotted"
        style={{
          borderColor: uiColor,
          color: uiColor,
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="text-lg font-bold tracking-wide">
            Colour Contrast Pro
          </div>
  
          <div className="flex gap-6 text-sm font-medium opacity-80">
            <button style={{ color: uiColor }}>Checker</button>
            <button style={{ color: uiColor }}>Gradients</button>
            <button style={{ color: uiColor }}>Tokens</button>
          </div>
        </div>
      </div>
    );
  }
  