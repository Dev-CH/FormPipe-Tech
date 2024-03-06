import React, { useState } from 'react'
import { ActionIcon, Flex, Group, Indicator } from '@mantine/core'
import { IconFilter, IconListDetails, IconTableRow } from '@tabler/icons-react'
import { useUserManager } from '@context/UserManager'

interface ActionBarProps {
  onAction: (action: Action) => void
}

export enum Action {
  ViewList,
  ViewTable,
  ViewFilter,
}

export const ActionBar: React.FC<ActionBarProps> = ({ onAction }) => {
  const [currentView, setCurrentView] = useState<Action>(Action.ViewList)
  const { isFiltered } = useUserManager()

  const handleViewChange = (action: Action) => {
    setCurrentView(action)
    onAction(action)
  }

  return (
    <Flex justify={'space-between'} mb={'sm'}>
      <Group gap={'xs'}>
        <ActionIcon
          color={'grape'}
          size={'xl'}
          radius={'md'}
          variant={currentView === Action.ViewList ? 'filled' : 'light'}
          aria-label={'List View'}
          onClick={() => handleViewChange(Action.ViewList)}
        >
          <IconListDetails />
        </ActionIcon>
        <ActionIcon
          color={'grape'}
          size={'xl'}
          radius={'md'}
          variant={currentView === Action.ViewTable ? 'filled' : 'light'}
          aria-label={'Table View'}
          onClick={() => handleViewChange(Action.ViewTable)}
        >
          <IconTableRow />
        </ActionIcon>
      </Group>
      <Indicator color={'grape'} offset={3} disabled={!isFiltered} size={15} withBorder>
        <ActionIcon
          color={'grape'}
          size={'xl'}
          radius={'md'}
          variant={'light'}
          aria-label={'Toggle Filters'}
          onClick={() => onAction(Action.ViewFilter)}
        >
          <IconFilter />
        </ActionIcon>
      </Indicator>
    </Flex>
  )
}
