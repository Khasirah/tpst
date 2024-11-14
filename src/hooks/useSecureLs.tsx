import {useRef} from "react";
import SecureLS from "secure-ls";

function useSecureLs() {
  const secureLSRef = useRef<SecureLS | null>(null)

  if (!secureLSRef.current) {
    secureLSRef.current = new SecureLS({
      encryptionSecret: import.meta.env.VITE_SECRET_KEY
    });
  }

  function setItem(key: string, value: string) {
    secureLSRef.current?.set(key, value)
  }

  function getItem(key: string) {
    return secureLSRef.current?.get(key)
  }

  function removeItem(key: string) {
    secureLSRef.current?.remove(key)
  }

  function clear() {
    secureLSRef.current?.clear()
  }

  return {setItem, getItem, removeItem, clear}
}

export default useSecureLs;