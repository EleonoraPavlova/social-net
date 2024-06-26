import React, { useCallback } from 'react'
import { useSelector } from 'react-redux'
import './index.scss'
import { Button } from 'components/Button'
import { authThunks, selectIsLoggedIn } from 'BLL/reducers/authSlice'
import { selectUserProfile } from 'BLL/reducers/userProfileSlice'
import { Logo } from 'components/Logo'
import { Typography } from '@mui/material'
import { selectAppMeId } from 'BLL/reducers/appSlice'
import { useActions } from 'common/hooks/useActions'

export const Header = () => {
  let isLoggedIn = useSelector(selectIsLoggedIn)
  const profile = useSelector(selectUserProfile)
  const meId = useSelector(selectAppMeId)
  const { logOutTC } = useActions(authThunks)

  const logOutHandler = useCallback(() => {
    logOutTC()
  }, [isLoggedIn])

  return (
    <header className="header">
      <Logo img="header__img" additionalClass="header__text" />
      {isLoggedIn && (
        <div className="flex-end">
          <Typography variant="h6" sx={{ fontSize: '15px', fontWeight: 'bold', color: 'green', margin: '0 20px' }}>
            {profile.userId === meId ? profile.fullName : null}
          </Typography>
          <Button name={'Log Out'} additionalClass="header__button" callBack={logOutHandler} />
        </div>
      )}
    </header>
  )
}
