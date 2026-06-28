import { Reveal } from '@/components/motion/reveal';

// Layer names and descriptions intentionally in English in both locales — these are
// technical tier identifiers (L0–L3, FastAPI, PostgreSQL) that are locale-invariant.
const LAYERS = [
  {
    key: 'L0',
    name: 'Infrastructure',
    desc: 'FastAPI · PostgreSQL · Redis · cron scheduler',
    highlight: false,
  },
  {
    key: 'L1',
    name: 'Data Layer',
    desc: '10 crawlers · 70+ sources · 4 languages · raw ingest',
    highlight: false,
  },
  {
    key: 'L2',
    name: 'Signal Layer',
    desc: 'Fundamental · sentiment · momentum · regime factors',
    highlight: false,
  },
  {
    key: 'L3',
    name: 'Conviction Output',
    desc: 'Daily ranking · Telegram brief · query interface',
    highlight: true,
  },
] as const;

function LayerCard({ layer }: { layer: (typeof LAYERS)[number] }) {
  return (
    <div className="flex-1 bg-surface border border-white/[0.06] rounded-sm p-4 min-w-0">
      <p className="font-mono text-xs text-copper mb-1">{layer.key}</p>
      <p className={`text-sm font-semibold mb-1 ${layer.highlight ? 'text-copper' : 'text-fg'}`}>
        {layer.name}
      </p>
      <p className="font-mono text-xs text-muted leading-relaxed">{layer.desc}</p>
    </div>
  );
}

export function ArchitectureDiagram() {
  return (
    <Reveal delay={0.15}>
      <div className="w-full">
        {/* Desktop: horizontal row */}
        <div className="hidden md:flex items-center gap-px">
          {LAYERS.flatMap((layer, i) => {
            const card = <LayerCard key={layer.key} layer={layer} />;
            if (i < LAYERS.length - 1) {
              return [
                card,
                <div
                  key={`arrow-d-${i}`}
                  className="flex-shrink-0 px-2 text-copper/60 font-mono text-lg select-none"
                  aria-hidden="true"
                >
                  →
                </div>,
              ];
            }
            return [card];
          })}
        </div>

        {/* Mobile: vertical stack */}
        <div className="flex md:hidden flex-col items-stretch gap-px">
          {LAYERS.flatMap((layer, i) => {
            const card = <LayerCard key={`m-${layer.key}`} layer={layer} />;
            if (i < LAYERS.length - 1) {
              return [
                card,
                <div
                  key={`arrow-m-${i}`}
                  className="text-copper/60 font-mono text-lg text-center py-1 select-none"
                  aria-hidden="true"
                >
                  ↓
                </div>,
              ];
            }
            return [card];
          })}
        </div>
      </div>
    </Reveal>
  );
}
