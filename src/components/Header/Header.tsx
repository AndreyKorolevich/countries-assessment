import { ChangeEvent, useEffect, useRef } from 'react'
import styles from './Header.module.scss'
import { HeaderComponent } from './types'
import { InputAdornment, OutlinedInput } from '@mui/material'

export const Header: HeaderComponent = ({ updateSearchInput }) => {
  const filterRef = useRef<HTMLHeadingElement | null>(null)

  function onChange(event: ChangeEvent<HTMLInputElement>) {
    updateSearchInput(event.target.value)
  }

  // Effect to observe when the filter element reaches the fixed position
  useEffect(() => {
    /* browser does not provide API to track when element with position sticky reach the fix position, for this used IntersectionObserver */
    const observer = new IntersectionObserver(
      ([e]) => {
        // Toggle the 'filterSticked' class based on the intersection ratio
        e.target.classList.toggle(styles.filterSticked, e.intersectionRatio < 1)
      },
      { threshold: [1] }
    )

    if (filterRef.current) {
      observer.observe && observer.observe(filterRef.current)
    }

    // Clean up the observer when the component is unmounted
    return () => {
      observer.disconnect && observer.disconnect()
    }
  }, [])

  return (
    <header className={styles.header} ref={filterRef}>
      <OutlinedInput
        onChange={onChange}
        fullWidth
        endAdornment={<InputAdornment position='end'>Name</InputAdornment>}
        inputProps={{
          'aria-label': 'name',
        }}
      />
    </header>
  )
}

export default Header
