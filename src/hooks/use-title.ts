import { useEffect } from "react"

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = `${title} | ${import.meta.env.REACT_APP_NAME}`
  }, [title])
}
