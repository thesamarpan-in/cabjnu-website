// A conceptual diagram, not the real knowledge graph (deferred until
// there's enough compound/target/paper data to make one — see roadmap
// Phase 6). This just illustrates the Centre's research logic:
// Plant -> Compound -> Target -> Pathway -> Biological Effect.
export default function ResearchNetworkDiagram() {
  const nodes = [
    { label: 'Plant', color: '#C5A059' },      // gold — biological
    { label: 'Compound', color: '#C5A059' },   // gold — biological
    { label: 'Molecular Target', color: '#5B6068' }, // slate — molecular
    { label: 'Pathway', color: '#5B6068' },    // slate — molecular
    { label: 'Biological Effect', color: '#D95D39' }, // clay — outcome
  ];

  return (
    <svg
      viewBox="0 0 900 120"
      className="w-full h-auto"
      role="img"
      aria-label="Diagram: Plant leads to Compound, leads to Molecular Target, leads to Pathway, leads to Biological Effect"
    >
      {nodes.map((node, i) => {
        const x = 20 + i * 220;
        return (
          <g key={node.label}>
            <rect
              x={x}
              y={35}
              width={180}
              height={50}
              fill="none"
              stroke={node.color}
              strokeWidth={1.5}
            />
            <text
              x={x + 90}
              y={65}
              textAnchor="middle"
              fontFamily="var(--font-lato), system-ui, sans-serif"
              fontSize="14"
              fill="#1C1C1C"
            >
              {node.label}
            </text>
            {i < nodes.length - 1 && (
              <line
                x1={x + 180}
                y1={60}
                x2={x + 220}
                y2={60}
                stroke="#D9D2C4"
                strokeWidth={1.5}
                markerEnd="url(#arrow)"
              />
            )}
          </g>
        );
      })}
      <defs>
        <marker
          id="arrow"
          markerWidth="8"
          markerHeight="8"
          refX="6"
          refY="4"
          orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="#D9D2C4" />
        </marker>
      </defs>
    </svg>
  );
}
