
export default function ErrorMessage({children}: {children: React.ReactNode}) {
  return (
    <div className="my-2 py-1 text-red-400 font-semibold  text-sm">
        {children}
    </div>
  )
}
