"use client"
import { useEditor, EditorContent } from "@tiptap/react"
import Starterkit from "@tiptap/starter-kit"
import Heading from  "@tiptap/extension-heading"
import Toolbar from "../toolbar/Toolbar"
export default function Tiptap({
description,
onChange
}:{
    description: string;
    onChange?: (richText:string) => void
}) {
    const editor = useEditor({
        extensions: [Starterkit.configure({
            bulletList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
              orderedList: {
                keepMarks: true,
                keepAttributes: false, // TODO : Making this as `false` becase marks are not preserved when I try to preserve attrs, awaiting a bit of help
              },
        }), Heading.configure({
            HTMLAttributes:{
                class: "text-xl font-bold",
                levels: [2],
            }
        })],
        content: description,
        editorProps: {
            attributes: {
                class:
                "rounded-md border min-h-[150px] border-input bg-white"
        },
    },
    onUpdate({ editor }) {
        onChange(editor.getHTML())
        console.log(editor.getHTML)
        },
    })
    return (
        <div className="flex flex-col justify-stretch min-h-[250px]">
            <Toolbar editor={editor}/>
            <EditorContent editor={editor} />
        </div>
    )
}