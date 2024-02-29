"use client"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import Tiptap from "../tiptap/Tiptap"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"

const formSchema = z.object({
  title: z.string()
        .min(5,{ message: "Hey the title is not long enough."})
        .max(100, { message: "its too long."}),
        price: z.number().min(5, { message: " hey "}),
        description: z.string().min(5, { message: " Hey the message "}).max(100, {message: " its too long"}).trim(),
})

export function EditorForm() {
  const [formData, setFormData] = useState({ title: '', description: '' });

  const form  = useForm<z.infer<typeof formSchema>>({ mode: "onChange",
  resolver: zodResolver(formSchema),
      defaultValues: {
          title: "",
          price: 29.99,
          description: "",
      },
  })
 function onSubmit(values:z.infer<typeof formSchema>){
  console.log("submitted values ", values)
  setFormData({ title: values.title, description: values.description })
 }

return (
<main className="p-24">
  <Form {...form}>
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <FormField 
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="main title for your paragraph" />
            </FormControl>
          </FormItem>
        )} 
        />
        <FormField 
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Tiptap description={field.name} onChange={field.onChange}/>
            </FormControl>
          </FormItem>
        )} 
        />
        <Button className="my-2" type="submit">Submit</Button>
    </form>
  </Form>
</main>
)
}
