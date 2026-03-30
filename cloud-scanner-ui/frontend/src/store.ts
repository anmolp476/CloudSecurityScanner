import { create } from 'zustand'


interface Finding { 
    resource: string,
    rule: string,
    severity: string
}


interface ScanStore { 
    findings: Finding[]
    setFindings: (findings: Finding[]) => void
}

export const useScanStore = create<ScanStore>((set) => ({
    findings: [],
    setFindings: (findings) => set({ findings })
}))

