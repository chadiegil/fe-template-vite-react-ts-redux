import { useEffect } from "react"

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | ${import.meta.env.VITE_APP_NAME}`
  }, [title])
}
