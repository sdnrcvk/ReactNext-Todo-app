import { collection, onSnapshot, query,orderBy } from "firebase/firestore"
import { db } from "@/firebase/firebase"
import { useState,useEffect } from "react"

export default function TodoList() {
    const [todos, setTodos]=useState([]);

    useEffect(()=>{
        const ref=collection(db,"todos");
        const q=query(ref,orderBy("tarih","desc"))
        const unsub=onSnapshot(q,(snap)=>{
            setTodos(snap.docs.map(doc=>(
                {...doc.data(),id:doc.id,tarih:doc.data().tarih?.toDate().getTime()}
            )))
        })

        return unsub;
    },[])

  return (
    <div>
        {todos.map(todo=><div key={todo.id}>{todo.baslik}</div>)}
    </div>
  )
}
