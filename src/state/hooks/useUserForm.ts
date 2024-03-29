import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react'
import { ExtendedInitialState } from '../reducers/userProfileSlice/userProfileSlice'

export function useUserForm(
  profileUserState: ExtendedInitialState,
  setProfileUserState: (arg: any) => void,
  updateProfileUser: () => void,
  updateProfileUserStatus: () => void
) {
  const [editMode, setEditMode] = useState<boolean>(false)

  const collectionOfForm = (key: string, title: string) => {
    setProfileUserState((prevState: ExtendedInitialState) => ({
      ...prevState,
      [key]: title,
    }))
  }

  const collectionOfFormCheckbox = (e: ChangeEvent<HTMLInputElement>) => {
    setProfileUserState((prevState: ExtendedInitialState) => ({
      ...prevState,
      lookingForAJob: e.currentTarget.checked,
    }))
  }

  const formRef = useRef(null)
  const handleContainerClick = (e: Event) => {
    e.preventDefault()
    const currentElement = e.target

    if (formRef.current) {
      // @ts-ignore
      const isContain = formRef.current.contains(currentElement)

      if (!isContain) {
        setEditMode(false)
        setProfileUserState(profileUserState)
        const body = document.querySelector('body')
        body?.removeEventListener('click', handleContainerClick)
      }
    }
  }

  useEffect(() => {
    const body = document.querySelector('body')
    if (editMode) {
      body?.addEventListener('click', handleContainerClick)
    }
  }, [editMode])

  const saveForm = useCallback(() => {
    setProfileUserState(profileUserState)
    if (!editMode) {
      setEditMode(true)
    } else {
      updateProfileUser()
      updateProfileUserStatus()
      setEditMode(false)
    }
  }, [editMode, profileUserState])

  return {
    editMode,
    formRef,
    setEditMode,
    collectionOfForm,
    collectionOfFormCheckbox,
    saveForm,
  }
}
