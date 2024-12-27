import * as React from "react"

const DEFAULT_MOBILE_BREAKPOINT = 768

export function useIsMobile(breakpoint?: number) {
  const effectiveBreakpoint = breakpoint ?? DEFAULT_MOBILE_BREAKPOINT
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${effectiveBreakpoint - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < effectiveBreakpoint)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < effectiveBreakpoint)
    return () => mql.removeEventListener("change", onChange)
  }, [effectiveBreakpoint])

  return !!isMobile
}
