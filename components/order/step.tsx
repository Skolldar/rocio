export default function Step({
  number,
  title,
  children,
}: {
  number: number
  title: string
  children: React.ReactNode
}) {
  const id = `paso-${number}`
  return (
    <section aria-labelledby={id}>
      <h2 id={id} className="mb-5 flex items-baseline gap-3 text-xl font-semibold sm:text-2xl">
        <span className="text-sm font-medium tabular-nums text-gold-deep">
          {String(number).padStart(2, "0")}
        </span>
        {title}
      </h2>
      {children}
    </section>
  )
}
