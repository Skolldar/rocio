import { Droplet, Leaf, ShieldCheck, type LucideIcon } from "lucide-react"

type Stamp = {
  id: string
  icon: LucideIcon
  ring: string
  label: string
  description: string
}

const stamps: Stamp[] = [
  {
    id: "hipoalergenico",
    icon: Leaf,
    ring: "Hipoalergénico",
    label: "Hipoalergénico",
    description: "Sin níquel ni plomo, apto para pieles sensibles.",
  },
  {
    id: "resistente-agua",
    icon: Droplet,
    ring: "Resistente al agua",
    label: "Resistente al agua",
    description: "Ducha, playa y piscina sin quitártelas.",
  },
  {
    id: "alta-durabilidad",
    icon: ShieldCheck,
    ring: "Alta durabilidad",
    label: "Alta durabilidad",
    description: "Acero inoxidable con baño de oro o plata que no se oscurece.",
  },
]

type QualityStampsProps = {
  className?: string
}

export default function QualityStamps({ className = "" }: QualityStampsProps) {
  return (
    <ul
      className={`grid grid-cols-1 gap-10 sm:grid-cols-3 sm:gap-8 ${className}`}
    >
      {stamps.map((stamp) => {
        const pathId = `stamp-ring-${stamp.id}`
        const ringText = `${stamp.ring.toUpperCase()} · `
        return (
          <li
            key={stamp.id}
            className="flex flex-col items-center text-center"
          >
            <svg
              viewBox="0 0 160 160"
              role="img"
              aria-labelledby={`${pathId}-title`}
              className="size-36 text-gold-deep sm:size-40"
            >
              <title id={`${pathId}-title`}>{stamp.label}</title>
              <defs>
                <path
                  id={pathId}
                  d="M80 80 m-58 0 a58 58 0 1 1 116 0 a58 58 0 1 1 -116 0"
                />
              </defs>

              {/* Outer + inner rings */}
              <circle
                cx="80"
                cy="80"
                r="76"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle
                cx="80"
                cy="80"
                r="71"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeDasharray="2 3"
              />
              <circle
                cx="80"
                cy="80"
                r="44"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              />

              {/* Text around the ring */}
              <text
                fill="currentColor"
                fontSize="11.5"
                fontWeight="600"
                letterSpacing="2.4"
                textLength="364"
                lengthAdjust="spacing"
              >
                <textPath href={`#${pathId}`}>
                  {ringText}
                  {ringText}
                </textPath>
              </text>

              {/* Icon */}
              <stamp.icon
                x="58"
                y="58"
                width="44"
                height="44"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </svg>

            <h3 className="mt-5 text-sm font-medium uppercase tracking-[0.18em]">
              {stamp.label}
            </h3>
            <p className="mt-2 max-w-[28ch] text-sm font-regular leading-relaxed text-muted-foreground">
              {stamp.description}
            </p>
          </li>
        )
      })}
    </ul>
  )
}
