import { Task } from "@/types";
import AddNoteForm from "./AddNoteForm";
import NoteDetail from "./NoteDetail";

type NotesPanelProps = {
    notes: Task['notes']
}

export default function NotesPanel({notes}: NotesPanelProps) {

  return (
    <>
        <AddNoteForm />

        <div className="mt-10">
            {notes.length ? (
                <>
                    <p className="my-3 text-2xl font-bold text-slate-600">Notes: </p>
                    {notes.map(note => <NoteDetail key={note._id} note={note}/>)}
                </>
             ) : (<p className={'text-gray-500 text-center pt-3'}>There are not notes</p>)}
        </div>
    </>
  )
}
