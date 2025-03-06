'use client'

import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Message } from 'ai'
import { ArrowUp, MessageCirclePlus, Square } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'
import Textarea from 'react-textarea-autosize'

interface ChatPanelProps {
  input: string
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void
  isLoading: boolean
  messages: Message[]
  setMessages: (messages: Message[]) => void
  query?: string
  stop: () => void
  append: (message: Message) => void
}

export default function ChatPanel({
  input,
  handleInputChange,
  handleSubmit,
  isLoading,
  messages,
  setMessages,
  query,
  stop,
  append,
}: ChatPanelProps) {
  const router = useRouter()
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const isFirstRender = useRef(true)

  const handleNewChat = () => {
    setMessages([])
    router.push('/')
  }

  useEffect(() => {
    if (isFirstRender.current && query && query.trim().length > 0) {
      append({
        id: uuidv4(),
        role: 'user',
        content: query
      })
      isFirstRender.current = false
    }
  }, [query, append])

  return (
    <div
  className={cn(
    'w-full transition-transform duration-700 ease-in-out bg-background',
    messages.length > 0 ? 'translate-y-2' : 'translate-y-[-30rem]'
  )}
    >
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex items-center justify-center w-full',
          messages.length > 0 ? 'px-2 py-4' : 'px-6'
        )}
      >
        <div className="relative flex flex-col w-full max-w-3xl gap-2 bg-muted rounded-3xl">
          <Textarea
            ref={inputRef}
            name="input"
            rows={2}
            maxRows={5}
            tabIndex={0}
            placeholder="Ask a question..."
            spellCheck={false}
            value={input}
            className="resize-none w-full min-h-12 bg-transparent border-0 px-4 py-3 text-sm placeholder:text-muted-foreground focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50"
            onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === 'Enter' && !e.shiftKey) {
                if (input.trim().length === 0) {
                  e.preventDefault()
                  return
                }
                e.preventDefault()
                const textarea = e.target as HTMLTextAreaElement
                textarea.form?.requestSubmit()
              }
            }}
          />

          <div className="flex items-center justify-between p-3">
            <div className="flex items-center gap-2">
              {messages.length > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleNewChat}
                  className="shrink-0 rounded-full group bg-zinc-900 hover:bg-zinc-800"
                  type="button"
                  disabled={isLoading}
                >
                  <MessageCirclePlus className="size-4 transition-all" />
                </Button>
              )}
              <Button
                type={isLoading ? 'button' : 'submit'}
                size="icon"
                variant="outline"
                className={cn(
                  'bg-zinc-900 hover:bg-zinc-800',
                  isLoading && 'animate-pulse',
                  'rounded-full'
                )}
                disabled={input.length === 0 && !isLoading}
                onClick={isLoading ? stop : undefined}
              >
                {isLoading ? <Square size={20} /> : <ArrowUp size={20} />}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
