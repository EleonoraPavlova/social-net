import React, { useState } from 'react'
import './index.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import Box from '@mui/material/Box'
import { UserApi } from 'common/types'
import { useAppDispatch } from 'common/hooks/selectors'
import { decreaseLikeCounterAC, increaseLikeCounterAC } from 'BLL/reducers/usersSlice'
import { Friend } from 'features/pages/Friends/Friend'
import { Typography } from '@mui/material'

type Props = {
  item: UserApi
}

export const Post: React.FC<Props> = ({ item }) => {
  const { id, followed, likeCounter } = item
  let [isHighlighted, setisHighlighted] = useState<boolean>(false)
  const dispatch = useAppDispatch()

  const isHighlightedHandler = () => {
    if (!isHighlighted) {
      dispatch(increaseLikeCounterAC({ userId: id }))
      return setisHighlighted(true)
    } else {
      dispatch(decreaseLikeCounterAC({ userId: id }))
      return setisHighlighted(false)
    }
  }

  return followed ? (
    <Box className="post" id={`${id}`}>
      <Box className="flex-start">
        <Friend friend={item} />
      </Box>
      <Box className="post__wrap-icon">
        <FontAwesomeIcon
          icon={faHeart}
          className={`post__icon ${isHighlighted ? 'red' : ''}`}
          onClick={isHighlightedHandler}
        />
        <Typography variant="h6" sx={{ fontSize: '12px' }}>
          {likeCounter}
        </Typography>
      </Box>
    </Box>
  ) : null
}
