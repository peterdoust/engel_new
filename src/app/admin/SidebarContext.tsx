'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type SidebarContextValue = {
  extras: React.ReactNode
  setExtras: (node: React.ReactNode) => void
}

const SidebarContext = createContext<SidebarContextValue>({
  extras: null,
  setExtras: () => {},
})

export function SidebarProvider({ children }: { children: React.ReactNode }) {
  const [extras, setExtras] = useState<React.ReactNode>(null)
  return (
    <SidebarContext.Provider value={{ extras, setExtras }}>
      {children}
    </SidebarContext.Provider>
  )
}

export function useSidebarSlot() {
  return useContext(SidebarContext)
}

// Hook for pages to render content into the sidebar
export function useSidebarExtras(node: React.ReactNode, deps: any[] = []) {
  const { setExtras } = useSidebarSlot()
  useEffect(() => {
    setExtras(node)
    return () => setExtras(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}
