import { useDroppable } from "@dnd-kit/core"

type DropTaskProps = {
    status: string
}

export default function DropTask({status}: DropTaskProps) {
    const { isOver, setNodeRef} = useDroppable({
        id: status
    })

    const style = {
      opacity: isOver? 0.4 : 1,
      transition: 'all 0.3s',
      paddingTop: isOver ? '2.5rem' : '.5rem',
      paddingBottom: isOver ? '2.5rem' : '.5rem',
    }
  return (
    <div
        ref={setNodeRef}
        style={style}
        className="grid px-2 py-4 mt-5 text-xs font-semibold uppercase border-2 border-dashed border-slate-400 rounded-2xl place-content-center text-slate-500"
    
    >Drop task here</div>
  )
}
